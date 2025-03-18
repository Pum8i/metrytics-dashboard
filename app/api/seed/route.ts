import { db } from "@/app/lib/db";
import { visitors } from "@/drizzle/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    message: "Uncomment to seed data after DB is set up.",
  });

  await db.insert(visitors).values([
    {
      app_name: "app1",
      ip_address: "192.168.1.1",
      location: "US-NY",
      browser_os: "Chrome/Windows",
      page: "/home",
      referrer: "Google",
      timestamp: new Date(),
    },
    {
      app_name: "app1",
      ip_address: "10.0.0.1",
      location: "UK-LDN",
      browser_os: "Safari/macOS",
      page: "/products",
      referrer: "Facebook",
      timestamp: new Date(),
    },
    {
      app_name: "app2",
      ip_address: "172.16.0.1",
      location: "DE-BER",
      browser_os: "Firefox/Linux",
      page: "/about",
      referrer: "Direct",
      timestamp: new Date(),
    },
  ]);

  return Response.json({
    message: "Database seeded successfully",
  });
}
