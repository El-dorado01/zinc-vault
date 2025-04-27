// app/api/test-supabase/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data, error } = await supabase
      .from("approved_users")
      .select("email")
      .limit(1);
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Supabase test error", { error });
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
