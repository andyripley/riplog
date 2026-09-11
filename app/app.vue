<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const menuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Contact",
    to: "/contact",
  },
]);
</script>

<template>
  <UApp>
    <UHeader title="RipLog">
      <UNavigationMenu :items="menuItems" />
    </UHeader>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
