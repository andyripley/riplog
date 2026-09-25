<script setup lang="ts">
defineProps<{
  color?: string;
}>();
</script>

<template>
  <span class="blink" :style="color ? { color } : undefined">
    <slot />
  </span>
</template>
