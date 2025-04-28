import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const { pathname } = request.nextUrl;

  // Define public routes that don't require session verification
  const publicPaths = ["/auth/signin", "/api/v1/session", "/api/v1/verify-session"];

  // If accessing /auth/signin or /auth/verify, check for an active session
  if (pathname === "/auth/signin" || pathname === "/auth/verify") {
    if (sessionToken) {
      try {
        // Ensure NEXTAUTH_URL is defined
        const baseUrl = process.env.NEXTAUTH_URL;
        if (!baseUrl) {
          console.error(
            "NEXTAUTH_URL is not defined in environment variables"
          );
          throw new Error("Missing NEXTAUTH_URL");
        }

        // Verify session via API route
        const verifyResponse = await fetch(`${baseUrl}/api/v1/verify-session`, {
          headers: {
            "x-session-token": sessionToken,
          },
        });

        if (verifyResponse.ok) {
          const { success, email } = await verifyResponse.json();
          if (success) {
            console.log("Active session found, redirecting to dashboard:", {
              email,
            });
            return NextResponse.redirect(new URL("/dashboard", request.url));
          }
        }

        // If session is invalid, clear the cookie and proceed to the requested page
        console.log("Invalid or expired session token, clearing cookie");
        const response = NextResponse.next();
        response.cookies.delete("sessionToken");
        return response;
      } catch (err: any) {
        console.error("Error verifying session in middleware:", {
          message: err.message,
          stack: err.stack,
        });
        // Clear cookie on error and proceed
        const response = NextResponse.next();
        response.cookies.delete("sessionToken");
        return response;
      }
    }
    // No session token, allow access to /auth/signin or /auth/verify
    return NextResponse.next();
  }

  // Allow access to other public routes
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for session token for protected routes
  if (!sessionToken) {
    console.log("No session token found, redirecting to signin");
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Verify session for protected routes
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    if (!baseUrl) {
      console.error("NEXTAUTH_URL is not defined in environment variables");
      throw new Error("Missing NEXTAUTH_URL");
    }

    const verifyResponse = await fetch(`${baseUrl}/api/v1/verify-session`, {
      headers: {
        "x-session-token": sessionToken,
      },
    });

    if (!verifyResponse.ok) {
      console.log("Session verification failed, redirecting to signin");
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url)
      );
      response.cookies.delete("sessionToken");
      return response;
    }

    const { success, email } = await verifyResponse.json();
    if (!success) {
      console.log("Invalid or expired session, redirecting to signin");
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url)
      );
      response.cookies.delete("sessionToken");
      return response;
    }

    console.log("Session verified via API, allowing access:", { email });
    return NextResponse.next();
  } catch (err: any) {
    console.error("Error verifying session in middleware:", {
      message: err.message,
      stack: err.stack,
    });
    const response = NextResponse.redirect(
      new URL("/auth/signin", request.url)
    );
    response.cookies.delete("sessionToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/v1/protected/:path*",
    "/auth/signin",
    "/auth/verify",
  ],
};
