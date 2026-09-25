import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteCounters = sqliteTable("site_counters", {
  key: text().primaryKey(),
  count: integer().notNull().default(0),
});
