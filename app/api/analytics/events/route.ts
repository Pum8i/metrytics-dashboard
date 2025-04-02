import { addEvent, getEvents } from "@/app/lib/db";
import { IEventData } from "@/app/types";
import { ipAddress } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

// import { generateMockEvents } from "@/app/lib/mockData";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  // const events = generateMockEvents(10);
  const events = await getEvents();
  return NextResponse.json(events);
}

/**
 * @description Handles POST requests for collecting event analytics data.
 *
 * @param {NextRequest} request - The incoming NextRequest object containing analytics data.
 *
 *
 * @remarks
 * This endpoint processes event analytics data. It expects a JSON payload in the request body with the following structure:
 * ```json
 * {
 *   "appName": "your-app-name", // Required: The name of the application.
 *   "eventName": "user-logged-in", // Required: The name of the event.
 *   "eventDescription": "User successfully logged in.", // Optional: A description of the event.
 *   "ip": "192.168.1.1", // Optional: The IP address of the client. If not provided, it will be inferred from the request.
 *   "timestamp": "2023-10-27T10:00:00Z" // Optional: The timestamp of the event. If not provided, the current time will be used.
 * }
 * ```
 *
 * The server will attempt to determine the client's IP address and other data if it's not provided in the request body.
 *
 * @throws Will return a 500 status if internal server error occurs
 *
 * @returns NextResponse with status 200 and success message if analytics data is processed successfully
 */
export async function POST(request: NextRequest) {
  try {
    const ipServer = ipAddress(request);

    const body = await request.json();
    const { appName, eventName, id, eventDescription, ip, timestamp } = body;

    // Validate the body
    if (!appName || !eventName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 422 }
      );
    }

    const eventData: IEventData = {
      id,
      app_name: appName,
      ip_address: ip ?? ipServer ?? "unknown",
      event: eventName,
      description: eventDescription,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };

    console.log("Adding Event:", eventData);

    const addedEvent: IEventData = await addEvent(eventData);

    console.log("Event Added:", addedEvent);

    return NextResponse.json(
      {
        message: "POST - Event added",
        id: addedEvent.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Simple Analytics Internal Server Error" },
      { status: 500 }
    );
  }
}
