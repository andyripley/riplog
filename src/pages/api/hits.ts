import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

// Runs on the Worker at request time (not prerendered).
export const prerender = false;

const KEY = "hits";

async function read(): Promise<number> {
  return Number((await env.HITS.get(KEY)) ?? 0);
}

const json = (count: number) =>
  Response.json({ count }, { headers: { "cache-control": "no-store" } });

export const GET: APIRoute = async () => json(await read());

// KV isn't atomic; fine for a guestbook-era vanity counter.
export const POST: APIRoute = async () => {
  const count = (await read()) + 1;
  await env.HITS.put(KEY, String(count));
  return json(count);
};
