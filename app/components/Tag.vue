<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "default" | "draft";
  }>(),
  {
    variant: "default",
  },
);
</script>

<template>
  <span class="tag" :class="{ draft: variant === 'draft' }">
    <slot />
  </span>
</template>

<style scoped>
.tag {
  display: inline-block;
  font: 12px var(--font-mono);
  border: 1px solid var(--link);
  padding: 0 4px;
  margin-right: 4px;
}

.draft {
  color: var(--red);
}
</style>
