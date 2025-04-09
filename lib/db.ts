import { events, user, visitors } from "@/drizzle/schema";
import { neon } from "@neondatabase/serverless";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { count, countDistinct, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import {
  IAllEventData,
  IEventData,
  IKeyVisits,
  IVisitorData,
} from "../app/types";

const client = neon(`${process.env.POSTGRES_URL!}`);
export const db = drizzle(client);

export async function getRecentVisitors(
  limit: number = 50,
  offset: number = 0
): Promise<IVisitorData[]> {
  const recentVisitors = await db
    .select()
    .from(visitors)
    .orderBy(desc(visitors.timestamp))
    .limit(limit)
    .offset(offset);
  return recentVisitors;
}

export async function getVisitorAggregates(): Promise<{
  pageViews: number;
  uniqueVisitors: number;
  referrers: IKeyVisits[];
  pages: IKeyVisits[];
  countries: IKeyVisits[];
  cities: IKeyVisits[];
}> {
  const [
    totalCountResult,
    uniqueCountResult,
    referrerCountsResult,
    pageCountsResult,
    countryCountsResult,
    cityCountsResult,
  ] = await Promise.all([
    // 1. Total Page Views
    db.select({ value: count() }).from(visitors),

    // 2. Unique Visitors (by IP)
    db.select({ value: countDistinct(visitors.ip_address) }).from(visitors),

    // 3. Referrer Counts
    db
      .select({
        key: visitors.referrer,
        visits: count(),
      })
      .from(visitors)
      .groupBy(visitors.referrer)
      .orderBy(desc(count())),

    // 4. Page Counts
    db
      .select({
        key: visitors.page,
        visits: count(),
      })
      .from(visitors)
      .groupBy(visitors.page)
      .orderBy(desc(count())),

    // 5. Country Counts
    db
      .select({
        key: visitors.country,
        visits: count(),
      })
      .from(visitors)
      .groupBy(visitors.country)
      .orderBy(desc(count())),

    // 6. City Counts
    db
      .select({
        key: visitors.city,
        visits: count(),
      })
      .from(visitors)
      .groupBy(visitors.city)
      .orderBy(desc(count())),
  ]);

  const pageViews = totalCountResult[0]?.value ?? 0;
  const uniqueVisitors = uniqueCountResult[0]?.value ?? 0;

  const calculatePercentages = (
    results: { key: string; visits: number }[],
    total: number
  ): IKeyVisits[] => {
    if (total === 0) return results.map((r) => ({ ...r, percent: 0 }));
    return results.map((item) => ({
      ...item,
      percent: parseFloat(((item.visits / total) * 100).toFixed(1)),
    }));
  };

  const referrers = calculatePercentages(referrerCountsResult, pageViews);
  const pages = calculatePercentages(pageCountsResult, pageViews);
  const countries = calculatePercentages(countryCountsResult, pageViews);
  const cities = calculatePercentages(cityCountsResult, pageViews);

  return {
    pageViews,
    uniqueVisitors,
    referrers,
    pages,
    countries,
    cities,
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
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return await db.insert(user).values({ email, password: hash }).returning();
}

export async function getEvents(): Promise<IAllEventData> {
  const allEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.timestamp));
  return { allEvents, totalEvents: allEvents.length };
}

export async function addEvent(event: IEventData) {
  const insertedEvent: IEventData[] = await db
    .insert(events)
    .values([event])
    .returning();
  return insertedEvent[0];
}
