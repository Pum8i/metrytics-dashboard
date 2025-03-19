import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const visitors = pgTable("visitors", {
  id: uuid()
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  app_name: text("app_name").notNull(),
  ip_address: text("ip_address").notNull(),
  location: text("location").notNull(),
  browser_os: text("browser_os").notNull(),
  page: text("page").notNull(),
  referrer: text("referrer").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});
