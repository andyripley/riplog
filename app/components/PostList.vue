<script setup lang="ts">
import type { BlogCollectionItem } from "@nuxt/content";

withDefaults(
  defineProps<{
    posts: BlogCollectionItem[];
    showTags?: boolean;
  }>(),
  { showTags: false },
);
</script>

<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.path">
      <span class="date">{{ formatDate(post.pubDate) }}</span>
      <h3>
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
        <New v-if="isNewPost(post.pubDate)" />
      </h3>
      <div>{{ post.description }}</div>
      <div v-if="showTags && post.tags?.length">
        <Tag v-for="tag in post.tags" :key="tag">{{ tag }}</Tag>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
}

.post-list li {
  border: 2px dashed var(--accent);
  padding: 0.6em 0.8em;
  margin: 0.8em 0;
  background: color-mix(in srgb, var(--panel) 70%, transparent);
}

.post-list h3 {
  margin: 0.2em 0;
}

.date {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--silver);
}
</style>
