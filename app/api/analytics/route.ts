"use server";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { addVisitor, getVisitors } from "@/app/lib/db";
import { getLocationInfo } from "@/app/lib/utils";
import { ipAddress } from "@vercel/functions";
import { IVisitorData } from "@/app/types";

// import { generateMockVisitors } from "@/app/lib/mockData";

export async function GET() {
  // TODO Update mock to include new fields
  // const visitors = generateMockVisitors(10);
  const visitors = await getVisitors();
  return NextResponse.json(visitors);
}

export async function POST(request: NextRequest) {
  try {
    const requestHeaders = new Headers(request.headers);
    const { browser: browserServer, os: osServer } = userAgent(request);
    const ipServer = ipAddress(request);
    const referrerServer = requestHeaders.get("referrer") || "unknown";
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
      referrer,
      page,
      timestamp,
    } = body;

    // TODO - need to add in some validation?
    // Validate the body (example: check if required fields are present)
    // if (!body.ipAddress || !body.page) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    if (ip) {
      const { city, country } = await getLocationInfo(ip);
      cityServer = city;
      countryServer = country;
    }

    const browserName = browser ?? browserServer?.name ?? "unknown";
    const osName = os ?? osServer?.name ?? "unknown";

    const visitor = {
      app_name: appName,
      city: city ?? cityServer,
      country: country ?? countryServer,
      ip_address: ip ?? ipServer,
      browser_os: `${browserName}/${osName}`,
      browser: browserName,
      os: osName,
      referrer: referrer ?? referrerServer,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      page,
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
