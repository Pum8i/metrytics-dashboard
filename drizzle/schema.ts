import {
  pgTable,
  unique,
  uuid,
  varchar,
  text,
  integer,
  date,
  serial,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const status = pgEnum("status", ["active", "inactive", "archived"]);

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

export const users = pgTable(
  "users",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    name: varchar({ length: 255 }).notNull(),
    email: text().notNull(),
    password: text().notNull(),
  },
  (table) => [unique("users_email_key").on(table.email)]
);

export const customers = pgTable("customers", {
  id: uuid()
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid()
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  customerId: uuid("customer_id").notNull(),
  amount: integer().notNull(),
  status: varchar({ length: 255 }).notNull(),
  date: date().notNull(),
});

export const revenue = pgTable(
  "revenue",
  {
    month: varchar({ length: 4 }).notNull(),
    revenue: integer().notNull(),
  },
  (table) => [unique("revenue_month_key").on(table.month)]
);

export const products = pgTable("products", {
  id: serial().primaryKey().notNull(),
  imageUrl: text("image_url").notNull(),
  name: text().notNull(),
  status: status().notNull(),
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  stock: integer().notNull(),
  availableAt: timestamp("available_at", { mode: "string" }).notNull(),
});
