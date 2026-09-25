<script setup lang="ts">
import type { NuxtError } from "#app";

const siteConfig = useAppConfig().site;
const props = defineProps<{ error: NuxtError }>();
const isNotFound = computed(() => props.error.statusCode === 404);
const isGone = computed(() => props.error.statusCode === 410);
const errorTitle = computed(() => {
  if (isNotFound.value) return "404 Not Found";
  if (isGone.value) return "410 Gone";
  return "Something went wrong";
});

useSeoMeta({
  title: `${errorTitle.value} :: ${siteConfig.title}`,
  description: isNotFound.value
    ? "This page has been abducted by aliens."
    : "The server tripped over a modem cable.",
  robots: "noindex, nofollow",
});

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", href: "/favicon.ico", sizes: "any" }],
});
</script>

<template>
  <AppShell>
    <div class="center">
      <h1 class="error-code glow">{{ error.statusCode }}</h1>
      <h2 v-if="isNotFound"><Blink>ERROR!</Blink> File Not Found</h2>
      <h2 v-else-if="isGone"><Blink>GONE!</Blink> Guestbook Removed</h2>
      <h2 v-else><Blink>ERROR!</Blink> {{ error.statusMessage }}</h2>
      <p v-if="isNotFound">
        The page you requested has been abducted by aliens, or maybe it moved to
        GeoCities.
      </p>
      <p v-else-if="isGone">
        The guestbook has closed, but the rest of the homepage is still online.
      </p>
      <p v-else>The server tripped over a modem cable. Please try again.</p>
      <pre v-if="isNotFound" class="error-terminal">
C:\&gt; dir page.htm
File not found
C:\&gt; _</pre>
      <p><Button href="/">&laquo; Return to homepage</Button></p>
    </div>
  </AppShell>
</template>

<style scoped>
.error-code {
  color: var(--red);
  font-size: 4rem;
  margin: 0.2em 0;
}

.error-terminal {
  text-align: left;
  display: inline-block;
}
</style>
