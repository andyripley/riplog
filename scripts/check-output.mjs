import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const output = new URL("../.output/", import.meta.url);

async function read(path) {
  return readFile(new URL(path, output), "utf8");
}

const expectedFiles = [
  "public/index.html",
  "public/about.html",
  "public/blog.html",
  "public/blog/mdx-tips.html",
  "public/blog/middle-ground.html",
  "public/robots.txt",
  "public/rss.xml",
  "public/sitemap.xml",
  "server/wrangler.json",
];

await Promise.all(expectedFiles.map(read));

const home = await read("public/index.html");
const post = await read("public/blog/middle-ground.html");
const rss = await read("public/rss.xml");
const sitemap = await read("public/sitemap.xml");
const wrangler = JSON.parse(await read("server/wrangler.json"));

assert.match(home, /<link rel="canonical" href="https:\/\/ley\.rip\/">/);
assert.match(home, /href="\/blog\/middle-ground"/);
assert.doesNotMatch(home, /\/guestbook/);
assert.match(post, /application\/ld\+json/);
assert.match(post, /https:\/\/ley\.rip\/blog\/middle-ground/);
assert.match(rss, /<link>https:\/\/ley\.rip\/blog\/middle-ground<\/link>/);
assert.match(sitemap, /<loc>https:\/\/ley\.rip\/about<\/loc>/);
assert.equal(wrangler.d1_databases?.[0]?.binding, "DB");
assert.equal(wrangler.assets?.binding, "ASSETS");
assert.equal(wrangler.observability?.traces?.enabled, true);

console.log("Generated output checks passed.");
