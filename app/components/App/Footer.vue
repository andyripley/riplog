<script lang="ts" setup>
const siteConfig = useAppConfig().site;

const updated = siteConfig.lastUpdated.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
</script>

<template>
  <footer class="site-footer">
    <p>
      <EffectsBlink color="var(--yellow)">
        *
      </EffectsBlink>
      Best viewed in <b>Netscape Navigator 4.0</b> at <b>800x600</b>
      resolution
      <EffectsBlink color="var(--yellow)">
        *
      </EffectsBlink>
    </p>
    <p>Last updated: {{ updated }}</p>
    <p>
      Questions? Comments?
      <a :href="`mailto:${siteConfig.email}`">E-mail the webmaster!</a>
    </p>
    <p>
      &copy; {{ new Date().getFullYear() }} {{ siteConfig.author }}. All
      rights reserved. No part of this homepage may be reproduced without
      permission. Seriously.
    </p>
  </footer>
</template>

<style>

</style>
