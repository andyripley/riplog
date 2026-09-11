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
  compatibilityDate: "2025-04-03",
  hub: {
    db: {
      dialect: "sqlite",
      driver: "d1",
      connection: { databaseId: "cf7a69f3-0db4-40dd-a5cf-0fce40b9cc61" },
    },
    kv: {
      driver: "cloudflare-kv-binding",
      namespaceId: "223991ba74c84c09bb6ec28508d0757e",
    },
    cache: {
      driver: "cloudflare-kv-binding",
      namespaceId: "223991ba74c84c09bb6ec28508d0757e",
    },
    blob: {
      driver: "cloudflare-r2",
      bucketName: "https://pub-214da011848b43fda5953aef0b2771ce.r2.dev",
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
