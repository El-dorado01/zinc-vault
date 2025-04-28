import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sessionToken } = await request.json();
    if (!sessionToken) {
      console.error("Session token missing in request");
      return NextResponse.json(
        { error: "Session token required" },
        { status: 400 }
      );
    }

    // Set HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "sessionToken",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60, // 3 hours in seconds
    });

    console.log("Session cookie set successfully");
    return response;
  } catch (err: any) {
    console.error("Error setting session cookie:", {
      message: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { error: "Failed to set session" },
      { status: 500 }
    );
  }
}
