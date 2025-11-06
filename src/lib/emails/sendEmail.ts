import { render } from "@react-email/render";
import { ReactElement } from "react";
import { Resend } from "resend";

// Lazy initialization to avoid errors during build when env vars are not set
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  react,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  react?: ReactElement;
}) {
  // Validar que las variables de entorno existen
  if (!process.env.RESEND_API_KEY) {
    const error = new Error("RESEND_API_KEY is not configured in environment variables");
    console.error("[SEND_EMAIL] Missing RESEND_API_KEY");
    throw error;
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    const error = new Error("RESEND_FROM_EMAIL is not configured in environment variables");
    console.error("[SEND_EMAIL] Missing RESEND_FROM_EMAIL");
    throw error;
  }

  // Si se proporciona un componente React, renderizarlo
  let htmlContent: string | undefined;
  let textContent: string | undefined;

  if (react) {
    htmlContent = await render(react);
    textContent = await render(react, { plainText: true });
  } else {
    htmlContent = html;
    textContent = text;
  }

  const resend = getResend();
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject,
    html: htmlContent!,
    text: textContent,
  });

  // Verificar si hay un error en la respuesta
  if (result.error) {
    const errorMessage = `Resend API error: ${result.error.message || JSON.stringify(result.error)}`;
    console.error("[SEND_EMAIL] Resend API error:", result.error);
    throw new Error(errorMessage);
  }

  // Verificar que se haya enviado correctamente
  if (!result.data?.id) {
    const error = new Error("Email was not sent - no ID returned from Resend");
    console.error("[SEND_EMAIL] No ID returned from Resend:", result);
    throw error;
  }

  return result;
}
