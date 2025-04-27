import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "adebayosodiqkolade@gmail.com",
        subject: "Test Email",
        html: "<p>Test email from Resend</p>",
      }),
    });
    const data = await res.json();
    console.log("Test Resend response", { status: res.status, data });
    return NextResponse.json({ status: res.status, data });
  } catch (error) {
    console.error("Test Resend error", { error });
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
