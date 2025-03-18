import "server-only";

import { visitors } from "@/drizzle/schema";
import { neon } from "@neondatabase/serverless";
import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { IVisitorData } from "../types";

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export async function getVisitors(): Promise<{
  visitors: IVisitorData[];
  totalVisitors: number;
  uniqueVisitors: number;
  pages: { page: string; visits: number }[];
  referrers: { referrer: string; visits: number }[];
}> {
  const allVisitors = await db
    .select()
    .from(visitors)
    .orderBy(desc(visitors.timestamp));

  const totalVisitors = allVisitors.length;

  const uniqueVisitors = new Set(allVisitors.map((v) => v.ip_address)).size;

  const referrers = Array.from(
    allVisitors.reduce((map, visitor) => {
      map.set(visitor.referrer, (map.get(visitor.referrer) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([referrer, visits]) => ({ referrer, visits }));

  const pages = Array.from(
    allVisitors.reduce((map, visitor) => {
      map.set(visitor.page, (map.get(visitor.page) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([page, visits]) => ({ page, visits }));

  return {
    visitors: allVisitors,
    totalVisitors,
    uniqueVisitors,
    pages,
    referrers,
  };
}

export async function addVisitor(visitor: Omit<IVisitorData, "id">) {
  const insertedVisitor: IVisitorData[] = await db
    .insert(visitors)
    .values([visitor])
    .returning();
  return insertedVisitor[0];
}

export async function deleteVisitorById(id: string) {
  await db.delete(visitors).where(eq(visitors.id, id));
}
