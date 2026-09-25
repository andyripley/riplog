<script setup lang="ts">
const { data: posts } = await useAsyncData("all-posts", () =>
  queryCollection("blog").order("pubDate", "DESC").all(),
);

if (import.meta.server && posts.value) {
  prerenderRoutes(posts.value.map(post => post.path));
}
</script>

<template>
  <div>
    <h1 class="rainbow-text">
      Blog Posts
    </h1>
    <PostList
      :posts="posts ?? []"
      show-tags
    />
  </div>
</template>
