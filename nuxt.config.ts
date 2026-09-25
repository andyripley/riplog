export default defineNuxtConfig({
  modules: [
    "@nuxtjs/seo",
    "@nuxthub/core",
    "@nuxt/content",
    "@nuxt/eslint",
  ],
  devtools: { enabled: true },
  css: [
    "@fontsource/atkinson-hyperlegible/400.css",
    "@fontsource/atkinson-hyperlegible/700.css",
    "~/assets/css/index.css",
  ],
  site: {
    url: "https://ley.rip",
    name: "Riplog",
  },
  compatibilityDate: "2026-09-25",
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
});
