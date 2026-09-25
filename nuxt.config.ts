import { env } from "./shared/env";

export default defineNuxtConfig({
  compatibilityDate: "2026-09-25",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/seo",
    "@nuxthub/core",
    "@nuxt/content",
    // "nuxt-studio",
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
    },
    kv: true,
    cache: true,
    blob: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
      },
    },
  },
  // studio: {
  //   route: "/_studio",
  //   repository: {
  //     provider: "github",
  //     owner: env.repositoryOwner,
  //     repo: env.repositoryName,
  //     branch: "main",
  //     private: env.repositoryPrivate,
  //   },
  //   git: {
  //     commit: {
  //       messagePrefix: "content:",
  //     },
  //   },
  //   media: {
  //     publicUrl: "/",
  //   },
  // },
  // routeRules: {
  //   "/": { prerender: true },
  //   "/about": { prerender: true },
  //   "/blog": { prerender: true },
  //   "/blog/**": { prerender: true },
  //   "/rss.xml": { prerender: true },
  //   "/api/**": { cache: false },
  //   "/_studio": { cache: false, headers: { "x-robots-tag": "noindex" } },
  //   "/_studio/**": { cache: false, headers: { "x-robots-tag": "noindex" } },
  //   "/__nuxt_studio/**": {
  //     cache: false,
  //     headers: { "x-robots-tag": "noindex" },
  //   },
  // },
  // nitro: {
  //   preset: "cloudflare_module",
  //   prerender: {
  //     autoSubfolderIndex: false,
  //     crawlLinks: true,
  //     routes: [
  //       "/",
  //       "/about",
  //       "/blog",
  //       "/rss.xml",
  //       "/robots.txt",
  //       "/sitemap.xml",
  //     ],
  //   },
  //   cloudflare: {
  //     deployConfig: true,
  //     wrangler: {
  //       name: "riplog",
  //       compatibility_date: compatibilityDate,
  //       compatibility_flags: [
  //         "nodejs_compat",
  //         "nodejs_compat_populate_process_env",
  //         "global_fetch_strictly_public",
  //       ],
  //       assets: {
  //         run_worker_first: [
  //           "/about/*",
  //           "/blog/*",
  //           "/guestbook*",
  //           "/sitemap-index.xml",
  //         ],
  //       },
  //       observability: {
  //         enabled: true,
  //         // @ts-expect-error Nitro's config type lags Wrangler's trace support.
  //         traces: { enabled: true },
  //       },
  //     },
  //   },
  // },
});
