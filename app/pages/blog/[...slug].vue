<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(`post:${route.path}`, () =>
  queryCollection("blog").path(route.path).first(),
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

usePageSeo(post.value.title, post.value.description, {
  publishedTime: post.value.pubDate,
  modifiedTime: post.value.updatedDate,
  tags: post.value.tags,
});
</script>

<template>
  <PostLayout v-if="post" :post="post">
    <ContentRenderer :value="post" />
  </PostLayout>
</template>
