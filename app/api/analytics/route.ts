import { NextRequest, NextResponse } from "next/server";
import { addVisitor, getVisitors } from "@/app/lib/db";
import { getLocationInfo } from "@/app/lib/utils";
// import { generateMockVisitors } from "@/app/lib/mockData";

export async function GET() {
  // const visitors = generateMockVisitors(10);
  const visitors = await getVisitors();
  return NextResponse.json(visitors);
}

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  try {
    const apiKey = request.headers.get("x-api-key");

    if (
      process.env.REQUIRE_API_KEY === "true" &&
      apiKey !== process.env.API_KEY
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { appName, browser, ipAddress, os, page, referrer, timestamp } = body;
    console.log("🚀 ~ POST ~ body:", body);

    // TODO - need to add in some validation?
    // Validate the body (example: check if required fields are present)
    // if (!body.ipAddress || !body.page) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    const location = await getLocationInfo(body.ipAddress);

    const addedVisitor = await addVisitor({
      app_name: appName,
      ip_address: ipAddress,
      browser_os: `${browser}/${os}`,
      referrer,
      timestamp: new Date(timestamp),
      page,
      location,
    });

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
