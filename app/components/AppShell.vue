<script setup lang="ts">
import { NAV, SITE } from "~/../shared/site";

const route = useRoute();
const updated = SITE.lastUpdated.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function isCurrent(href: string) {
  return href === "/" ? route.path === "/" : route.path.startsWith(href);
}
</script>

<template>
  <CursorTrail />
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="page">
    <header class="banner">
      <div class="banner-row">
        <h1 class="site-title">
          <NuxtLink to="/" class="site-title-link">
            <span class="rainbow-text">{{ SITE.title }}</span>
          </NuxtLink>
        </h1>
        <Search />
      </div>
      <Marquee>{{ SITE.tagline }}</Marquee>
    </header>

    <table class="layout" role="presentation">
      <tbody>
        <tr>
          <td class="sidebar">
            <nav aria-label="Primary navigation">
              <h2>~ Navigation ~</h2>
              <ul class="nav center">
                <li v-for="item in NAV" :key="item.href">
                  <NuxtLink
                    :to="item.href"
                    :aria-current="isCurrent(item.href) ? 'page' : undefined"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <h2>~ Socials ~</h2>
            <Badges />

            <h2>~ Subscribe ~</h2>
            <p class="center">
              <Button href="/rss.xml">RSS Feed</Button>
            </p>

            <h2>~ Stats ~</h2>
            <HitCounter />
          </td>
          <td class="content">
            <main id="main-content" tabindex="-1">
              <slot />
            </main>
          </td>
        </tr>
      </tbody>
    </table>

    <footer class="site-footer">
      <p>
        <Blink color="var(--yellow)">*</Blink>
        Best viewed in <b>Netscape Navigator 4.0</b> at <b>800x600</b>
        resolution
        <Blink color="var(--yellow)">*</Blink>
      </p>
      <p>Last updated: {{ updated }}</p>
      <p>
        Questions? Comments?
        <a :href="`mailto:${SITE.email}`">E-mail the webmaster!</a>
      </p>
      <p>
        &copy; {{ new Date().getFullYear() }} {{ SITE.author }}. All rights
        reserved. No part of this homepage may be reproduced without permission.
        Seriously.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.site-title-link {
  text-decoration: none;
}

.skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 10000;
  padding: 6px 10px;
  color: var(--bg-dark);
  background: var(--yellow);
  transform: translateY(-150%);
}

.skip-link:focus {
  transform: translateY(0);
}
</style>
