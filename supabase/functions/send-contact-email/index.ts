import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone format").min(6).max(20),
  company: z.string().max(100).optional(),
  address: z.string().trim().min(5, "Address must be at least 5 characters").max(200, "Address too long"),
  serviceType: z.string().min(1).max(100),
  message: z.string().trim().min(1, "Message cannot be empty").max(2000, "Message too long")
});

type ContactFormData = z.infer<typeof contactSchema>;

// HTML escaping to prevent XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Rate limiting check (3 requests per hour per IP)
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3;
  
  const timestamps = rateLimitMap.get(ip) || [];
  const recentRequests = timestamps.filter(t => now - t < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Server-side validation
    const rawData = await req.json();
    const formData: ContactFormData = contactSchema.parse(rawData);

    // Build subject with company name
    const emailSubject = formData.company 
      ? `Nova ponuda | ${escapeHtml(formData.company)}`
      : `Nova ponuda | ${escapeHtml(formData.name)}`;

    // Build sanitized email HTML for owner
    const ownerEmailHtml = `
      <h2>${emailSubject}</h2>
      <p><strong>Ime i prezime:</strong> ${escapeHtml(formData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(formData.phone)}</p>
      ${formData.company ? `<p><strong>Tvrtka:</strong> ${escapeHtml(formData.company)}</p>` : ''}
      ${formData.address ? `<p><strong>Adresa:</strong> ${escapeHtml(formData.address)}</p>` : ''}
      <p><strong>Vrsta prostora/objekta:</strong> ${escapeHtml(formData.serviceType)}</p>
      <p><strong>Poruka:</strong></p>
      <p>${escapeHtml(formData.message)}</p>
    `;

    // Build confirmation email HTML for user
    const confirmationEmailHtml = `
      <h2>Hvala što ste nas kontaktirali!</h2>
      <p>Poštovani/a ${escapeHtml(formData.name)},</p>
      <p>Primili smo Vaš zahtjev za ponudu i zahvaljujemo Vam na interesu za naše usluge.</p>
      <p>Naš tim će pregledati Vaš zahtjev i javiti Vam se u najkraćem mogućem roku.</p>
      <p><strong>Detalji Vašeg zahtjeva:</strong></p>
      <p><strong>Vrsta prostora/objekta:</strong> ${escapeHtml(formData.serviceType)}</p>
      ${formData.address ? `<p><strong>Adresa:</strong> ${escapeHtml(formData.address)}</p>` : ''}
      <p>S poštovanjem,<br>Facility Servis tim</p>
    `;

    // Send email to owner
    await resend.emails.send({
      from: "Facility Servis <onboarding@resend.dev>",
      to: ["marinprusac5@gmail.com"],
      subject: emailSubject,
      html: ownerEmailHtml,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "Facility Servis <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Hvala na Vašem upitu - Facility Servis",
      html: confirmationEmailHtml,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid form data", 
          details: error.errors.map(e => e.message)
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.error("Error in send-contact-email function:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
