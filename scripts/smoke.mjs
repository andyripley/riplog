import assert from "node:assert/strict";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:8787";

async function request(path, init) {
  return fetch(`${baseUrl}${path}`, { redirect: "manual", ...init });
}

for (const path of [
  "/",
  "/about",
  "/blog",
  "/blog/mdx-tips",
  "/blog/middle-ground",
  "/robots.txt",
  "/rss.xml",
  "/sitemap.xml",
]) {
  const response = await request(path, { headers: { accept: "text/html" } });
  assert.equal(response.status, 200, `${path} should return 200`);
}

const studio = await request("/_studio", { headers: { accept: "text/html" } });
if (process.env.EXPECT_STUDIO === "true") {
  assert.equal(studio.status, 302, "configured Studio should start OAuth");
  assert.equal(studio.headers.get("location"), "/__nuxt_studio/auth/github");
  const auth = await request("/__nuxt_studio/auth/github");
  assert.equal(auth.status, 302, "GitHub auth route should redirect");
  assert.match(
    auth.headers.get("location") ?? "",
    /^https:\/\/github\.com\/login\/oauth\/authorize/,
  );
} else {
  assert.ok(
    studio.status === 200 || studio.status === 404,
    "Studio should load or fail closed when OAuth is absent",
  );
}
assert.match(studio.headers.get("x-robots-tag") ?? "", /noindex/);

for (const [from, to] of [
  ["/about/", "/about"],
  ["/blog/middle-ground/", "/blog/middle-ground"],
  ["/sitemap-index.xml", "/sitemap.xml"],
]) {
  const response = await request(from);
  assert.equal(response.status, 308, `${from} should permanently redirect`);
  assert.equal(response.headers.get("location"), to);
}

const missing = await request("/not-here", {
  headers: { accept: "text/html" },
});
assert.equal(missing.status, 404);
assert.match(await missing.text(), /File Not Found/);

const guestbook = await request("/guestbook", {
  headers: { accept: "text/html" },
});
assert.equal(guestbook.status, 410);
assert.match(await guestbook.text(), /Guestbook Removed/);

const before = await request("/api/hits");
assert.equal(before.status, 200);
assert.equal(before.headers.get("cache-control"), "no-store");
const beforeCount = (await before.json()).count;

const incremented = await request("/api/hits", {
  method: "POST",
  headers: { origin: baseUrl },
});
assert.equal(incremented.status, 200);
assert.equal((await incremented.json()).count, beforeCount + 1);

const rejected = await request("/api/hits", {
  method: "POST",
  headers: { origin: "https://example.com" },
});
assert.equal(rejected.status, 403);

console.log(`Runtime smoke checks passed against ${baseUrl}.`);
