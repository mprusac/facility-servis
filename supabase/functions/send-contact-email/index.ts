import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  serviceType: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData);

    const emailHtml = `
      <h2>Nova ponuda zahtjev od ${formData.name}</h2>
      <p><strong>Ime i prezime:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Telefon:</strong> ${formData.phone}</p>
      ${formData.company ? `<p><strong>Tvrtka:</strong> ${formData.company}</p>` : ''}
      ${formData.address ? `<p><strong>Adresa:</strong> ${formData.address}</p>` : ''}
      <p><strong>Vrsta prostora/objekta:</strong> ${formData.serviceType}</p>
      <p><strong>Poruka:</strong></p>
      <p>${formData.message}</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Facility Servis <onboarding@resend.dev>",
      to: ["marinprusac5@gmail.com"],
      subject: `Nova ponuda zahtjev - ${formData.name}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
