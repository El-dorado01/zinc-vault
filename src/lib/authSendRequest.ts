// lib/authSendRequest.ts
import type { EmailProviderSendVerificationRequestParams } from "next-auth/providers/email";

export async function sendVerificationRequest(
  params: EmailProviderSendVerificationRequestParams
) {
  const { identifier: to, provider, token, theme } = params;
  const { host } = new URL(process.env.NEXTAUTH_URL || "http://localhost:3000");

  const apiKey = provider.apiKey ?? process.env.RESEND_API_KEY;
  const from = provider.from ?? process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.error("Missing Resend API key or sender email", { apiKey, from });
    throw new Error(
      "Missing Resend API key or sender email. Check RESEND_API_KEY and EMAIL_FROM."
    );
  }

  console.log("Preparing to send OTP email", {
    to,
    from,
    token,
    host,
    apiKey: apiKey.slice(0, 4) + "...",
    endpoint: "https://api.resend.com/emails",
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Your OTP for ${host}`,
        html: html({ token, host, theme }),
        text: text({ token, host }),
      }),
    });

    const responseData = await res.json();
    console.log("Resend API response", {
      status: res.status,
      ok: res.ok,
      responseData,
    });

    if (!res.ok) {
      console.error("Resend API error", { status: res.status, responseData });
      if (res.status === 403) {
        console.error(
          "Resend 403: Likely due to unverified 'to' email or domain. Use your verified email or verify a domain in Resend."
        );
      }
      throw new Error("Resend error: " + JSON.stringify(responseData));
    }

    if (!responseData.id) {
      console.error(
        "Resend response missing email ID, email may not have been sent",
        { responseData }
      );
      throw new Error("Resend response missing email ID");
    }

    console.log("OTP email sent successfully", {
      to,
      emailId: responseData.id,
    });
    return responseData;
  } catch (error) {
    console.error("Failed to send OTP email", { error, to });
    throw error;
  }
}

function html(params: {
  token: string;
  host: string;
  theme: { brandColor?: string; buttonText?: string };
}) {
  const { token, host, theme } = params;

  const escapedHost = host.replace(/\./g, ".");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Your OTP for <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <span
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                ${token}
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        This OTP expires in 10 minutes. If you did not request this email, please ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

function text({ token, host }: { token: string; host: string }) {
  return `Your OTP for ${host}\n${token}\n\nThis OTP expires in 10 minutes.`;
}
