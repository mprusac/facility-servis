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
      <p><strong>Vrsta prostora:</strong> ${escapeHtml(formData.serviceType)}</p>
      <p><strong>Poruka:</strong></p>
      <p>${escapeHtml(formData.message)}</p>
    `;

    // Build professional confirmation email for customer
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
            .highlight { background: #eff6ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Facility Servis</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Profesionalno čišćenje i održavanje</p>
            </div>
            <div class="content">
              <h2 style="color: #1e40af; margin-top: 0;">Poštovani/a ${escapeHtml(formData.name)},</h2>
              
              <p>Hvala Vam na pokazanom interesu za naše usluge!</p>
              
              <p>Primili smo Vaš zahtjev za ponudu i zahvaljujemo se na Vašem povjerenju. Vaš upit je trenutno u obradi, a naš stručni tim će ga detaljno razmotriti.</p>
              
              <div class="highlight">
                <strong>📋 Detalji Vašeg zahtjeva:</strong><br>
                <strong>Vrsta prostora:</strong> ${escapeHtml(formData.serviceType)}<br>
                ${formData.address ? `<strong>Lokacija:</strong> ${escapeHtml(formData.address)}<br>` : ''}
                ${formData.company ? `<strong>Tvrtka:</strong> ${escapeHtml(formData.company)}<br>` : ''}
              </div>
              
              <p><strong>Javit ćemo Vam se povratno u najkraćem mogućem roku</strong> kako bismo dogovorili sve potrebne detalje i izradili personaliziranu ponudu prilagođenu Vašim potrebama.</p>
              
              <p>U međuvremenu, ako imate dodatnih pitanja ili želite razgovarati s nama, slobodno nas kontaktirajte:</p>
              
              <ul style="line-height: 2;">
                <li>📞 Telefon: <strong>091 946 6599</strong></li>
                <li>✉️ Email: <strong>facility-servis@outlook.com</strong></li>
              </ul>
              
              <p style="margin-top: 30px;">S poštovanjem,<br>
              <strong>Facility Servis tim</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Facility Servis - Profesionalne usluge čišćenja i održavanja</p>
              <p>Ovaj email je automatski generiran kao potvrda Vašeg zahtjeva.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Facility Servis <onboarding@resend.dev>",
      to: ["facility-servis@outlook.com"],
      subject: emailSubject,
      html: ownerEmailHtml,
    });

    console.log("Email sent to owner:", ownerEmailResponse);

    // Send confirmation email to customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "Facility Servis <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Hvala na Vašem upitu - Facility Servis",
      html: confirmationEmailHtml,
    });

    console.log("Confirmation email sent to customer:", confirmationEmailResponse);

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
