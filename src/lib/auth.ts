"use server";

import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { createHmac } from "crypto";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: "public" } }
);

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY!);


export async function generateSessionToken(email: string): Promise<string> {
  return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "3h" }); // 3-hour expiration
}

export async function verifySessionToken(token: string): Promise<{ email: string } | null> {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
  } catch (err: any) {
    console.error("Invalid or expired session token:", {
      message: err.message,
      stack: err.stack,
    });
    return null;
  }
}

// Generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Hash OTP using HMAC-SHA256
function hashOTP(otp: string): string {
  return createHmac("sha256", process.env.NEXTAUTH_SECRET!)
    .update(otp)
    .digest("hex");
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

export async function sendOTP(email: string) {
  try {
    // Input validation
    if (!email) {
      console.error("Email is required");
      return { error: "Email is required" };
    }
    if (!isValidEmail(email)) {
      console.error("Invalid email format:", { email });
      return { error: "Please enter a valid email address" };
    }

    // Check if email is in approved_users
    const { data: approvedUser, error: approvedError } = await supabase
      .from("approved_users")
      .select("email")
      .eq("email", email)
      .single();
    if (approvedError || !approvedUser) {
      console.error("Email not approved:", { email, approvedError });
      return {
        error: "This email is not authorized. Please use a registered email.",
      };
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = hashOTP(otp);
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store hashed OTP
    const { error: insertError } = await supabase
      .from("otp_verifications")
      .insert({
        email,
        token: hashedOTP,
        expires,
      });
    if (insertError) {
      console.error("Failed to store OTP:", { insertError });
      return { error: "Failed to generate OTP. Please try again." };
    }
    console.log("Stored hashed OTP:", { email, hashedOTP, expires });

    // Send OTP via Resend
    const { error: emailError } = await resend.emails.send({
      from: process.env.EMAIL_FROM!, // e.g., onboarding@resend.dev
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });
    if (emailError) {
      console.error("Failed to send OTP email:", { emailError });
      // Clean up stored OTP
      await supabase
        .from("otp_verifications")
        .delete()
        .eq("email", email)
        .eq("token", hashedOTP);
      return { error: "Failed to send OTP email. Please try again." };
    }

    console.log("OTP sent successfully to:", { email });
    return { success: true, email, message: "OTP sent! Please check your email." };
  } catch (err: any) {
    console.error("Unexpected error in sendOTP:", {
      message: err.message,
      stack: err.stack,
    });
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function verifyOTP(email: string, otp: string) {
  try {
    // Input validation
    if (!email || !otp) {
      console.error("Email and OTP are required");
      return { error: "Email and OTP are required" };
    }
    if (!isValidEmail(email)) {
      console.error("Invalid email format:", { email });
      return { error: "Please enter a valid email address" };
    }
    if (!/^\d{6}$/.test(otp)) {
      console.error("Invalid OTP format:", { otp });
      return { error: "OTP must be a 6-digit number" };
    }

    // Check if email is in approved_users
    const { data: approvedUser, error: approvedError } = await supabase
      .from("approved_users")
      .select("email")
      .eq("email", email)
      .single();
    if (approvedError || !approvedUser) {
      console.error("Email not approved:", { email, approvedError });
      return {
        error: "This email is not authorized. Please use a registered email.",
      };
    }

    // Hash the provided OTP
    const hashedOTP = hashOTP(otp);

    // Verify OTP
    const { data: otpData, error: otpError } = await supabase
      .from("otp_verifications")
      .select("*")
      .eq("email", email)
      .eq("token", hashedOTP)
      .single();
    if (otpError || !otpData) {
      console.error("Invalid or expired OTP:", { email, otpError });
      return { error: "Invalid or expired OTP. Please try again." };
    }

    // Check expiration
    const expires = new Date(otpData.expires);
    if (expires < new Date()) {
      console.error("OTP expired:", { email, expires });
      await supabase
        .from("otp_verifications")
        .delete()
        .eq("email", email)
        .eq("token", hashedOTP);
      return { error: "OTP has expired. Please request a new one." };
    }

    // OTP is valid, delete it to prevent reuse
    const { error: deleteError } = await supabase
      .from("otp_verifications")
      .delete()
      .eq("email", email)
      .eq("token", hashedOTP);
    if (deleteError) {
      console.error("Failed to delete OTP:", { deleteError });
      return { error: "Failed to complete verification. Please try again." };
    }

    // Generate session token
    const sessionToken = await import("@/lib/auth").then(
      ({ generateSessionToken }) => generateSessionToken(email)
    );
    console.log("OTP verified successfully for:", { email, sessionToken });

    return { success: true, redirect: "/dashboard", sessionToken };
  } catch (err: any) {
    console.error("Unexpected error in verifyOTP:", {
      message: err.message,
      stack: err.stack,
    });
    return { error: "An unexpected error occurred. Please try again." };
  }
}
