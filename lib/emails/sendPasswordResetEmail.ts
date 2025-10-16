import { sendEmail } from "./sendEmail";

export function sendPasswordResetEmail({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) {
  return sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 500px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="color: #111; text-align: center;">Password Reset Request</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>We received a request to reset your password. You can create a new one by clicking the button below:</p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${url}" 
            style="display: inline-block; background-color: #2563eb; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
            Reset Password
          </a>
        </div>

        <p>If you didn’t request this, you can safely ignore this email. Your account will remain secure.</p>
        <p>For security reasons, this link will expire in <strong>1 hour</strong>.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;">
        <p style="font-size: 13px; color: #666; text-align: center;">
          © ${new Date().getFullYear()} Open_Next. All rights reserved.<br/>
          This is an automated message, please do not reply.
        </p>
      </div>
    `,
    text: `
Hi ${user.name},

We received a request to reset your password. You can do so by visiting the following link:
${url}

If you didn’t request this, please ignore this email. The link will expire in 1 hour.

— The Open_Next Team
    `,
  });
}
