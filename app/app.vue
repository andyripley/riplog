<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const menuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Blog",
    to: "/blog",
    route: route.path.startsWith("/blog"),
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
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
