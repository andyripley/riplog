<script setup lang="ts">
import { computed } from "vue";

interface Props {
  href?: string;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
});

const isInternal = computed(
  () => props.href?.startsWith("/") && !props.href.startsWith("//"),
);
</script>

<template>
  <NuxtLink v-if="href && isInternal" class="btn" :to="href">
    <slot />
  </NuxtLink>
  <a v-else-if="href" class="btn" :href="href">
    <slot />
  </a>
  <button v-else class="btn" :type="type">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-block;
  font-family: var(--font-sys);
  font-size: 14px;
  color: var(--bg-dark);
  background: var(--silver);
  border: 2px outset var(--text);
  padding: 3px 10px;
  text-decoration: none;
  cursor: pointer;
}

.btn:active {
  border-style: inset;
}
</style>
