const compatibilityDate = "2026-09-25";
const localDatabaseId = "00000000-0000-0000-0000-000000000000";
const databaseId =
  process.env.NUXT_HUB_CLOUDFLARE_DATABASE_ID ?? localDatabaseId;
const configuredRepositoryOwner = process.env.NUXT_STUDIO_REPOSITORY_OWNER;
const configuredRepositoryName = process.env.NUXT_STUDIO_REPOSITORY_NAME;
const repositoryOwner = configuredRepositoryOwner ?? "local";
const repositoryName = configuredRepositoryName ?? "riplog";

if (process.env.WORKERS_CI && databaseId === localDatabaseId) {
  throw new Error(
    "NUXT_HUB_CLOUDFLARE_DATABASE_ID is required in Workers Builds",
  );
}

if (
  process.env.WORKERS_CI &&
  (!configuredRepositoryOwner || !configuredRepositoryName)
) {
  throw new Error(
    "NUXT_STUDIO_REPOSITORY_OWNER and NUXT_STUDIO_REPOSITORY_NAME are required in Workers Builds",
  );
}

export default defineNuxtConfig({
  compatibilityDate,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/sitemap",
    "@nuxthub/core",
    "@nuxt/content",
    "nuxt-studio",
    "@nuxtjs/robots",
    "@nuxt/eslint",
  ],
  css: [
    "@fontsource/atkinson-hyperlegible/400.css",
    "@fontsource/atkinson-hyperlegible/700.css",
    "~/assets/css/index.css",
  ],
  site: {
    url: "https://ley.rip",
    name: "Riplog",
  },
  hub: {
    db: {
      dialect: "sqlite",
      driver: "d1",
      connection: { databaseId },
      applyMigrationsDuringBuild: false,
    },
  },
  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },
  studio: {
    route: "/_studio",
    repository: {
      provider: "github",
      owner: repositoryOwner,
      repo: repositoryName,
      branch: "main",
      private: process.env.NUXT_STUDIO_REPOSITORY_PRIVATE !== "false",
    },
    git: {
      commit: {
        messagePrefix: "content:",
      },
    },
    media: {
      publicUrl: "/",
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/blog": { prerender: true },
    "/blog/**": { prerender: true },
    "/rss.xml": { prerender: true },
    "/api/**": { cache: false },
    "/_studio": { cache: false, headers: { "x-robots-tag": "noindex" } },
    "/_studio/**": { cache: false, headers: { "x-robots-tag": "noindex" } },
    "/__nuxt_studio/**": {
      cache: false,
      headers: { "x-robots-tag": "noindex" },
    },
  },
  nitro: {
    preset: "cloudflare_module",
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: [
        "/",
        "/about",
        "/blog",
        "/rss.xml",
        "/robots.txt",
        "/sitemap.xml",
      ],
    },
    cloudflare: {
      deployConfig: true,
      wrangler: {
        name: "riplog",
        compatibility_date: compatibilityDate,
        compatibility_flags: [
          "nodejs_compat",
          "nodejs_compat_populate_process_env",
          "global_fetch_strictly_public",
        ],
        assets: {
          run_worker_first: [
            "/about/*",
            "/blog/*",
            "/guestbook*",
            "/sitemap-index.xml",
          ],
        },
        observability: {
          enabled: true,
          // @ts-expect-error Nitro's config type lags Wrangler's trace support.
          traces: { enabled: true },
        },
      },
    },
  },
  robots: {
    header: false,
    disallow: ["/_studio", "/__nuxt_studio"],
    sitemap: "https://ley.rip/sitemap.xml",
  },
  sitemap: {
    exclude: ["/_studio/**", "/__nuxt_studio/**", "/api/**"],
    sources: ["/api/__sitemap__/urls"],
  },
});
