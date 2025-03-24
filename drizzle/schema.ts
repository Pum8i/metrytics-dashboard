import {
  pgTable,
  uuid,
  text,
  timestamp,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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

export const user = pgTable("User", {
  id: serial().primaryKey().notNull(),
  email: varchar({ length: 64 }),
  password: varchar({ length: 64 }),
});
