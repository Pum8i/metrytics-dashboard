// import { db } from "@/app/lib/db";
// import { visitors } from "@/drizzle/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    message: "Uncomment to seed data after DB is set up.",
  });

  // await db.insert(visitors).values([
  //   {
  //     app_name: "app1",
  //     ip_address: "192.168.1.1",
  //     city: "New York",
  //     country: "US",
  //     browser: "Chrome",
  //     os: "Windows",
  //     page: "/home",
  //     referrer: "Google",
  //     timestamp: new Date(),
  //   },
  //   {
  //     app_name: "app1",
  //     ip_address: "10.0.0.1",
  //     city: "London",
  //     country: "UK",
  //     browser: "Safari",
  //     os: "macOS",
  //     page: "/products",
  //     referrer: "Facebook",
  //     timestamp: new Date(),
  //   },
  //   {
  //     app_name: "app2",
  //     ip_address: "172.16.0.1",
  //     city: "Berlin",
  //     country: "DE",
  //     browser: "Firefox",
  //     os: "Linux",
  //     page: "/about",
  //     referrer: "Direct",
  //     timestamp: new Date(),
  //   },
  // ]);

  // return Response.json({
  //   message: "Database seeded successfully",
  // });
}
