"use server";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { addVisitor, getVisitors } from "@/app/lib/db";
import { getBrowserInfo, getLocationInfo } from "@/app/lib/utils";
import { ipAddress } from "@vercel/functions";

// import { generateMockVisitors } from "@/app/lib/mockData";

export async function GET() {
  // TODO Update mock to include new fields
  // const visitors = generateMockVisitors(10);
  const visitors = await getVisitors();
  return NextResponse.json(visitors);
}

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { browser, cpu, device, os, engine } = userAgent(request);
  // const { city, country, flag } = geolocation(request);
  const ip = ipAddress(request);
  const referrer = requestHeaders.get("referrer") || "unknown";

  const city = request.headers.get("x-vercel-ip-city") || "unknown";
  const country = request.headers.get("x-vercel-ip-country") || "unknown";
  const realIp = request.headers.get("x-real-ip") || "unknown";

  console.log(
    "User Agent:",
    browser,
    cpu,
    device,
    os,
    engine,
    city,
    country,
    ip,
    realIp,
    referrer
  );

  try {
    const apiKey = request.headers.get("x-api-key");

    if (
      process.env.REQUIRE_API_KEY === "true" &&
      apiKey !== process.env.API_KEY
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { appName, page, timestamp } = body;

    // TODO - need to add in some validation?
    // Validate the body (example: check if required fields are present)
    // if (!body.ipAddress || !body.page) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    const { city, country, location } = await getLocationInfo(ip ?? "");
    const { browserName, browserVersion, osName } = getBrowserInfo(
      requestHeaders.get("userAgent") ?? ""
    );

    const visitor = {
      app_name: appName,
      city: city ?? "unknown",
      country: country ?? "unknown",
      ip_address: ip ?? "unknown",
      browser_os: `${browser?.name ?? "unknown"}/${os?.name ?? "unknown"}`,
      browser: browser?.name ?? browserName ?? "unknown",
      os: os?.name ?? osName ?? "unknown",
      referrer: referrer ?? "unknown",
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      page,
      location,
    };

    console.log("addedVisitor response:", visitor);

    const addedVisitor = await addVisitor(visitor);

    console.log("addedVisitor response:", addedVisitor);

    return NextResponse.json({ message: "POST request received" });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Simple Analytics Internal Server Error" },
      { status: 500 }
    );
  }
}
