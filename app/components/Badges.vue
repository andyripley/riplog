<script setup lang="ts">
const badges = [
  {
    text: "Github",
    href: "https://github.com/andyripley",
    bg: "var(--bg-dark)",
    fg: "var(--white)",
  },
  {
    text: "LinkedIn",
    href: "https://www.linkedin.com/in/andrew-ripley-25a8135a",
    bg: "var(--blue)",
    fg: "var(--bg-dark)",
  },
];
</script>

<template>
  <div class="badges">
    <a
      v-for="badge in badges"
      :key="badge.href"
      class="badge"
      :href="badge.href"
      :style="{ background: badge.bg, color: badge.fg }"
      rel="noopener"
    >
      {{ badge.text }}
    </a>
  </div>
</template>

<style scoped>
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.badge {
  width: 88px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font: bold 11px/1.05 var(--font-sys);
  text-transform: uppercase;
  border: 2px outset var(--border);
  text-decoration: none;
  overflow: hidden;
  image-rendering: pixelated;
}

a.badge:hover {
  border-style: inset;
}
</style>
