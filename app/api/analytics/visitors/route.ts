"use server";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { addVisitor, getVisitors } from "@/app/lib/db";
import { getLocationInfo } from "@/app/lib/utils";
import { ipAddress } from "@vercel/functions";
import { IVisitorData } from "@/app/types";

// import { generateMockVisitors } from "@/app/lib/mockData";
export const runtime = "edge";

export async function GET() {
  // const visitors = generateMockVisitors(10);
  const visitors = await getVisitors();
  return NextResponse.json(visitors);
}

/**
 * Handles POST requests for analytics data collection.
 *
 * @param request - The incoming NextRequest object containing analytics data
 *
 * @remarks
 * This endpoint processes visitor analytics data, collecting information such as:
 * - Browser and OS details
 * - IP address and location (city/country)
 * - Referrer information
 * - Page visited
 * - Application name
 * - Timestamp
 *
 * You can pass the data in via a POST Body (good for if you're api call is coming from a Server) or let the server try to figure it out.
 *
 *
 * @throws Will return a 401 status if API key authentication fails
 * @throws Will return a 500 status if internal server error occurs
 *
 * @returns NextResponse with status 200 and success message if analytics data is processed successfully
 */
export async function POST(request: NextRequest) {
  try {
    const requestHeaders = new Headers(request.headers);
    const { browser: browserServer, os: osServer } = userAgent(request);
    const ipServer = ipAddress(request);
    const referrerServer = requestHeaders.get("referrer") || "unknown";

    // https://vercel.com/docs/headers/request-headers
    let cityServer = request.headers.get("x-vercel-ip-city") || "unknown";
    let countryServer = request.headers.get("x-vercel-ip-country") || "unknown";

    const apiKey = request.headers.get("x-api-key");

    if (
      process.env.REQUIRE_API_KEY === "true" &&
      apiKey !== process.env.API_KEY
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      appName,
      browser,
      city,
      country,
      ip,
      os,
      page,
      referrer,
      timestamp,
    } = body;

    // Validate the body
    if (!body.appName || !body.page) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If we're passing in the ip address as part of the body, we're assuming that we're
    if (ip) {
      const { city, country } = await getLocationInfo(ip);
      cityServer = city;
      countryServer = country;
    }

    const browserName = browser ?? browserServer?.name ?? "unknown";
    const osName = os ?? osServer?.name ?? "unknown";

    const visitor = {
      app_name: appName,
      page,
      city: city ?? cityServer,
      country: country ?? countryServer,
      ip_address: ip ?? ipServer ?? "unknown",
      browser: browserName,
      os: osName,
      referrer: referrer ?? referrerServer,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };

    console.log("Adding Visitor:", visitor);

    const addedVisitor: IVisitorData = await addVisitor(visitor);

    console.log("Visitor Added:", addedVisitor);

    return NextResponse.json({ message: "POST request received" });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Simple Analytics Internal Server Error" },
      { status: 500 }
    );
  }
}
