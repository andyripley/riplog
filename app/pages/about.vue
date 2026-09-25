<script setup lang="ts">
const { data: page } = await useAsyncData("about-page", () =>
  queryCollection("pages").path("/about").first(),
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

usePageSeo(page.value.title, page.value.description);
</script>

<template>
  <div class="prose">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
