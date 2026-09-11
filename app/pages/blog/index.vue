<script lang="ts" setup>
const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").all(),
);
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UBlogPosts
          v-if="posts?.length"
          orientation="vertical"
        >
          <UBlogPost
            v-for="post in posts"
            :key="post.path"
            :title="post.title"
            :description="post.description"
            :date="post.date"
            :to="post.path"
            variant="outline"
            :ui="{ footer: 'px-4 sm:px-6 pb-4 sm:pb-6 -mt-2' }"
          >
            <template #footer>
              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in post.tags"
                  :key="tag"
                  color="neutral"
                  size="sm"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </template>
          </UBlogPost>
        </UBlogPosts>
        <UPageEmpty
          v-else
          title="No posts yet"
          description="Check back soon."
        />
      </UContainer>
    </UPageBody>
  </UPage>
</template>
