<script lang="ts" setup>
const navConfig = useAppConfig().nav;

const route = useRoute();

function isCurrent(href: string) {
  return href === "/" ? route.path === "/" : route.path.startsWith(href);
}
</script>

<template>
  <div class="page">
    <AppHeader />

    <table
      class="layout"
      role="presentation"
    >
      <tbody>
        <tr>
          <td class="sidebar">
            <nav aria-label="Primary navigation">
              <h2>~ Navigation ~</h2>
              <ul class="nav center">
                <li
                  v-for="item in navConfig"
                  :key="item.href"
                >
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
            <SocialBadges />

            <h2>~ Subscribe ~</h2>
            <p class="center">
              <AppButton href="/rss.xml">
                RSS Feed
              </AppButton>
            </p>

            <h2>~ Stats ~</h2>
            <HitCounter />
          </td>
          <td class="content">
            <main
              id="main-content"
              tabindex="-1"
            >
              <slot />
            </main>
          </td>
        </tr>
      </tbody>
    </table>

    <AppFooter />
  </div>
</template>
