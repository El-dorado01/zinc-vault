// src/actions/sendOTP.ts
"use server";

import { signIn } from "@/auth";

export async function sendOTP(email: string) {
  try {
    console.log("Verifying email", { email });

    // Check email via API route
    const response = await fetch(
      `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/api/v1/verify-email`, // Updated to /api/v1
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    let errorData = null;
    try {
      errorData = await response.json();
    } catch (jsonError) {
      console.error("Failed to parse response as JSON", {
        status: response.status,
        jsonError,
      });
      errorData = { error: "Invalid response from server" };
    }

    if (!response.ok) {
      console.error("Email verification failed", {
        status: response.status,
        error: errorData.error,
      });
      return {
        error:
          errorData.error || "Email not found. Please use a registered email.",
      };
    }

    console.log("Email verified, sending OTP", { email });

    // Proceed with OTP sending
    const result = await signIn("email", {
      email,
      redirect: false,
    });

    if (result?.error?.includes("rate limit")) {
      console.error("Rate limit error", { email });
      return {
        error: "Too many requests. Please wait a few minutes and try again.",
      };
    }

    if (result?.error) {
      console.error("OTP sending failed", { error: result.error });
      return {
        error: result.error || "Failed to send OTP. Please try again.",
      };
    }

    console.log("OTP sent successfully", { email, result });
    return { success: true, email };
  } catch (err) {
    console.error("Unexpected error in sendOTP", { error: err });
    return { error: "An unexpected error occurred. Please try again." };
  }
}
