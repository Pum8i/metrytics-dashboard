import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle analytics API routes
  if (pathname.startsWith("/api/analytics")) {
    // Get the referer to check if it's an internal request
    // const referer = request.headers.get("referer");
    // const isInternalRequest =
    //   referer && new URL(referer).origin === request.nextUrl.origin;

    // // Skip API key check for internal requests
    // if (!isInternalRequest) {
    const apiKey = request.headers.get("x-api-key");
    const validApiKey = process.env.API_KEY;

    // If API key is missing or invalid, return 401
    if (!apiKey || apiKey !== validApiKey) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }
    // }

    // If API key is valid or it's an internal request, proceed
    return NextResponse.next();
  }

  // For non-analytics routes, apply NextAuth middleware
  return auth(request as any);
}

export const config = {
  matcher: [
    // Routes that need API key validation
    "/api/analytics/:path*",

    // Routes that need authentication
    // Exclude the analytics routes from authentication checks
    "/((?!api/analytics|_next/static|_next/image|.*\\.png$).*)",
  ],
};
