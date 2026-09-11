<script lang="ts" setup>
const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all(),
);
</script>

<template>
  <UPage>
    <UPageBody>
      <UPageHero title="Home Page" />
      <UContainer>
        <UBlogPosts
          v-if="posts?.length"
          orientation="horizontal"
        >
          <UBlogPost
            v-for="post in posts"
            :key="post.path"
            :title="post.title"
            :description="post.description"
            :date="post.date"
            :to="post.path"
            variant="outline"
          />
        </UBlogPosts>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
