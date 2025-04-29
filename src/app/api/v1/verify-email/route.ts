// app/api/v1/verify-email/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if email is in approved_users
    const { data, error } = await supabase
      .from("approved_users")
      .select("email")
      .eq("email", email)
      .single();

    if (error || !data) {
      console.error("Email not found in approved_users", { email, error });
      return NextResponse.json(
        { error: "Email not found. Please use a registered email." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Verify email error", {
        message: err.message,
        stack: err.stack,
      });
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error:", err);
    }
  }
}
