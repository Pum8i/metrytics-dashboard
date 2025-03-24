import { user, visitors } from "@/drizzle/schema";
import { neon } from "@neondatabase/serverless";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { IVisitorData } from "../types";

let client = neon(`${process.env.POSTGRES_URL!}`);
let db = drizzle(client);

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

export async function getUser(email: string) {
  return await db.select().from(user).where(eq(user.email, email));
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(user).values({ email, password: hash }).returning();
}
