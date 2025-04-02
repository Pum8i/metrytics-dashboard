import { events, user, visitors } from "@/drizzle/schema";
import { neon } from "@neondatabase/serverless";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { IEventData, IKeyVisits, IVisitorData } from "../types";

const client = neon(`${process.env.POSTGRES_URL!}`);
export const db = drizzle(client);

function countAndSort(
  items: IVisitorData[],
  keyExtractor: (item: IVisitorData) => string,
  totalVisitors: number
): IKeyVisits[] {
  const counts = items.reduce((map, item) => {
    const key = keyExtractor(item);
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map<string, number>());

  return Array.from(counts)
    .map(([key, visits]) => {
      const percent = (visits / totalVisitors) * 100;
      return {
        key,
        visits,
        percent: parseFloat(percent.toFixed(1)),
      };
    })
    .sort((a, b) => b.visits - a.visits);
}

export async function getVisitors(): Promise<{
  visitors: IVisitorData[];
  totalVisitors: number;
  uniqueVisitors: number;
  pages: IKeyVisits[];
  referrers: IKeyVisits[];
  cities: IKeyVisits[];
  countries: IKeyVisits[];
}> {
  const allVisitors = await db
    .select()
    .from(visitors)
    .orderBy(desc(visitors.timestamp));

  const totalVisitors = allVisitors.length;

  const uniqueVisitors = new Set(allVisitors.map((v) => v.ip_address)).size;

  const referrers = countAndSort(allVisitors, (v) => v.referrer, totalVisitors);

  const pages = countAndSort(allVisitors, (v) => v.page, totalVisitors);

  const countries = countAndSort(allVisitors, (v) => v.country, totalVisitors);

  const cities = countAndSort(allVisitors, (v) => v.city, totalVisitors);

  return {
    cities,
    countries,
    pages,
    referrers,
    totalVisitors,
    uniqueVisitors,
    visitors: allVisitors,
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

export async function getEvents(): Promise<{
  allEvents: IEventData[];
  totalEvents: number;
}> {
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
