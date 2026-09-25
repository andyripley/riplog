import { SITE } from "~/../shared/site";
import { queryCollection } from "@nuxt/content/server";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character] ?? character;
  });
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, "blog")
    .order("pubDate", "DESC")
    .all();
  const items = posts
    .map(
      (post) => `<item>
  <title>${escapeXml(post.title)}</title>
  <description>${escapeXml(post.description)}</description>
  <link>${SITE.url}${post.path}</link>
  <guid>${SITE.url}${post.path}</guid>
  <pubDate>${new Date(post.pubDate).toUTCString()}</pubDate>
${(post.tags ?? []).map((tag) => `  <category>${escapeXml(tag)}</category>`).join("\n")}
</item>`,
    )
    .join("\n");

  setResponseHeader(
    event,
    "content-type",
    "application/rss+xml; charset=utf-8",
  );
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${escapeXml(SITE.title)}</title>
  <description>${escapeXml(SITE.description)}</description>
  <link>${SITE.url}</link>
${items}
</channel>
</rss>`;
});
