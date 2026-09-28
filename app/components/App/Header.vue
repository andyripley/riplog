<script lang="ts" setup>
const siteConfig = useAppConfig().site;
</script>

<template>
  <header class="banner">
    <div class="banner-row">
      <h1 class="site-title">
        <NuxtLink
          to="/"
          class="site-title-link"
        >
          <span class="rainbow-text">{{ siteConfig.title }}</span>
        </NuxtLink>
      </h1>
      <TextSearch />
    </div>
    <EffectsMarquee>{{ siteConfig.tagline }}</EffectsMarquee>
  </header>
</template>

<style>
.site-title-link {
  text-decoration: none;
}
</style>
