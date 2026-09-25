<script setup lang="ts">
withDefaults(
  defineProps<{
    alt?: string;
  }>(),
  {
    alt: "NEW!",
  },
);
</script>

<template>
  <span class="new-badge">{{ alt }}</span>
</template>

<style scoped>
.new-badge {
  display: inline-block;
  font: bold 11px var(--font-sys);
  color: var(--bg-dark);
  background: var(--red);
  padding: 1px 4px;
  transform: rotate(-8deg);
  animation: blink 0.8s step-end infinite;
  vertical-align: middle;
}
</style>
