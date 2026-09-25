<script setup lang="ts">
const { data: posts } = await useAsyncData("latest-posts", () =>
  queryCollection("blog").order("pubDate", "DESC").limit(5).all(),
);
</script>

<template>
  <div>
    <h2>Latest Blog Post</h2>
    <p v-if="posts?.length === 0">
      No posts yet. Check back soon!
    </p>
    <PostList :posts="posts ?? []" />
    <p class="center">
      <Button href="/blog">
        View all entries &raquo;
      </Button>
    </p>
    <UnderConstruction
      message="Pardon our dust! New stuff is added all the time."
    />
  </div>
</template>
