<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: "span" | "h1" | "h2" | "h3" | "p";
  }>(),
  {
    as: "span",
  },
);
</script>

<template>
  <component
    :is="as"
    class="rainbow-text"
  >
    <slot />
  </component>
</template>
