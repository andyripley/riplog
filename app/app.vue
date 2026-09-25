<script setup lang="ts">
import { SITE } from "~/../shared/site";

useHead({
  htmlAttrs: { lang: "en" },
  titleTemplate: (title) => (title ? `${title} :: ${SITE.title}` : SITE.title),
  link: [
    { rel: "icon", href: "/favicon.ico", sizes: "any" },
    { rel: "sitemap", href: "/sitemap.xml" },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: SITE.title,
      href: `${SITE.url}/rss.xml`,
    },
  ],
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
