import { queryCollection } from "@nuxt/content/server";

export default defineSitemapEventHandler(async (event) => {
  const [posts, pages] = await Promise.all([
    queryCollection(event, "blog")
      .select("path", "pubDate", "updatedDate")
      .all(),
    queryCollection(event, "pages").select("path").all(),
  ]);

  return [
    { loc: "/" },
    { loc: "/blog" },
    ...pages.map((page) => ({ loc: page.path })),
    ...posts.map((post) => ({
      loc: post.path,
      lastmod: post.updatedDate ?? post.pubDate,
    })),
  ];
});
