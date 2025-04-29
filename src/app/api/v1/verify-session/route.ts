import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { headers } = request;
    const sessionToken = headers.get("x-session-token");

    if (!sessionToken) {
      console.log("No session token provided in verify-session request");
      return NextResponse.json(
        { error: "No session token provided" },
        { status: 401 }
      );
    }

    const session = await verifySessionToken(sessionToken); // Await the Promise
    if (!session) {
      console.log("Invalid or expired session token in verify-session");
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    console.log("Session verified successfully:", { email: session.email });
    return NextResponse.json({ success: true, email: session.email });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error verifying session:", {
        message: err.message,
        stack: err.stack,
      });
    } else {
      console.error("Unexpected error:", err);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
