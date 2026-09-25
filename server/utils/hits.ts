import { db, schema } from "@nuxthub/db";
import { eq, sql } from "drizzle-orm";

const KEY = "hits";

export async function readHitCount() {
  const [counter] = await db
    .select({ count: schema.siteCounters.count })
    .from(schema.siteCounters)
    .where(eq(schema.siteCounters.key, KEY));
  return counter?.count ?? 0;
}

export async function incrementHitCount() {
  const [counter] = await db
    .insert(schema.siteCounters)
    .values({ key: KEY, count: 1 })
    .onConflictDoUpdate({
      target: schema.siteCounters.key,
      set: { count: sql`${schema.siteCounters.count} + 1` },
    })
    .returning({ count: schema.siteCounters.count });
  if (!counter) throw new Error("Counter increment returned no value");
  return counter.count;
}

export function prepareHitResponse(
  event: Parameters<typeof setResponseHeader>[0],
) {
  setResponseHeader(event, "cache-control", "no-store");
}
