<script setup lang="ts">
import type { BlogCollectionItem } from "@nuxt/content";

defineProps<{ post: BlogCollectionItem }>();
</script>

<template>
  <article class="prose">
    <p><NuxtLink to="/blog">&laquo; Back to the Web Log</NuxtLink></p>
    <h1 class="gradient-text">
      {{ post.title }}
    </h1>
    <div class="post-meta">
      <div>
        <b>Posted:</b>
        <time :datetime="new Date(post.pubDate).toISOString()">
          {{ formatDate(post.pubDate) }}
        </time>
      </div>
      <div v-if="post.updatedDate">
        <b>Updated:</b>
        <time :datetime="new Date(post.updatedDate).toISOString()">
          {{ formatDate(post.updatedDate) }}
        </time>
      </div>
      <div v-if="post.mood">
        <b>Current mood:</b> {{ post.mood }}
      </div>
      <div v-if="post.nowPlaying">
        <b>Now playing:</b> {{ post.nowPlaying }}
      </div>
      <div v-if="post.tags?.length">
        <b>Tags:</b>
        <Tag
          v-for="tag in post.tags"
          :key="tag"
        >
          {{ tag }}
        </Tag>
      </div>
    </div>

    <slot />

    <hr class="rainbow">
    <p class="center">
      <Button href="/blog">
        &laquo; More posts
      </Button>
    </p>
  </article>
</template>

<style scoped>
.post-meta {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--silver);
  border: 2px inset var(--border);
  background: var(--bg-dark);
  padding: 0.4em 0.7em;
  margin-bottom: 1em;
}

.post-meta b {
  color: var(--lime);
}
</style>
