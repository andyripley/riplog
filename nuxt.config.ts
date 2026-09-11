// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxthub/core",
  ],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2026-09-11",
  nitro: {
    preset: "cloudflare-module",
    cloudflare: {
      wrangler: {
        name: "riplog",
        observability: {
          enabled: true,
          traces: { enabled: true },
        },
      },
    },
  },
  hub: {
    db: {
      dialect: "sqlite",
      driver: "d1",
      connection: { databaseId: "cf7a69f3-0db4-40dd-a5cf-0fce40b9cc61" },
    },
    kv: {
      driver: "cloudflare-kv-binding",
      namespaceId: "abf1a365256c4dff8f00fe486af3a63d",
    },
    cache: {
      driver: "cloudflare-kv-binding",
      namespaceId: "223991ba74c84c09bb6ec28508d0757e",
    },
    blob: {
      driver: "cloudflare-r2",
      bucketName: "blog-storage",
    },
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
      },
    },
  },
});
