import { Feed } from "feed";
import { SITE } from "~~/shared/site";

export default defineEventHandler(async (event) => {
  const blogPosts = await queryCollection(event, "blog").order("pubDate", "DESC").all();

  const feed = new Feed({
    title: SITE.title,
    description: SITE.description,
    id: SITE.url,
    link: SITE.url,
    image: `${SITE.url}/favicon.ico`,
    favicon: `${SITE.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    generator: "Nuxt RSS Feed",
    feedLinks: {
      rss2: `${SITE.url}rss.xml`,
    },
    author: {
      name: SITE.author,
      email: SITE.email,
      link: SITE.url,
    },
  });

  blogPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE.url}/${post.stem}`,
      link: `${SITE.url}/${post.stem}`,
      description: post.description,
      content: post.body.value.toString(),
      author: [{
        name: SITE.author,
        email: SITE.email,
        link: SITE.url,
      }],
      date: new Date(post.pubDate),
    });
  });

  setHeaders(event, { "Content-Type": "application/rss+xml" });

  return feed.rss2();
});
