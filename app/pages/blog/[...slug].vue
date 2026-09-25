<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(`post:${route.path}`, () =>
  queryCollection("blog").path(route.path).first(),
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}
</script>

<template>
  <PostLayout v-if="post" :post="post">
    <ContentRenderer :value="post" />
  </PostLayout>
</template>
