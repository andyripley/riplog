export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
  ],
  devtools: {
    enabled: true,
  },
  css: [
    "@fontsource/atkinson-hyperlegible/400.css",
    "@fontsource/atkinson-hyperlegible/700.css",
    "~/assets/css/index.css",
  ],
  compatibilityDate: "2026-09-25",
  nitro: {
    preset: "cloudflare-module",
  },
  hub: {
    db: {
      dialect: "sqlite",
      driver: "d1",
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
      binding: "BLOB",
      bucketName: "blog-storage",
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        "@nuxtjs/mdc",
      ],
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
  image: {
    provider: "cloudflare",
  },
});
