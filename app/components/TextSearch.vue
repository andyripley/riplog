<script setup lang="ts">
const { status, search } = useSearchCollection("blog");
const query = ref("");
const results = ref([]);

watch(query, async (value) => {
  results.value = value ? await search(value, { snippet: { columns: ["content"], around: 40 } }) : [];
});
</script>

<template>
  <div class="search">
    <input
      v-model="query"
      class="search-input"
      :disabled="status !== 'ready'"
      placeholder="Search..."
    >
    <ul
      v-if="query !== ''"
      class="search-results"
    >
      <li
        v-for="result in results"
        :key="result.id"
      >
        <NuxtLink :to="result.id">{{ result.title }}</NuxtLink>
        <p
          v-if="result.snippets?.content"
          v-html="result.snippets.content"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  display: block;
  flex: 0 1 280px;
  min-width: 0;
}

.search-input {
  width: 100%;
  font: 16px var(--font-sys);
  color: var(--text);
  background: var(--bg-dark);
  border: 2px inset var(--border);
  padding: 4px 8px;
}

.search-input::placeholder {
  color: var(--silver);
}

.search-input:focus-visible {
  outline: 2px dashed var(--yellow);
  outline-offset: 2px;
}

.search-results {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  left: 0;
  z-index: 100;
  list-style: none;
  margin: 0;
  padding: 4px;
  max-height: 60vh;
  overflow-y: auto;
  background: var(--panel);
  border: 3px ridge var(--border);
  text-align: left;
}

.search-results li {
  margin: 0;
}

.search-results a {
  display: block;
  padding: 4px 6px;
  font-family: var(--font-display);
  text-decoration: none;
}

.search-results a:hover,
.search-results a:focus-visible {
  background: var(--bg-highlight);
}

.search-desc {
  display: block;
  font: 13px var(--font-sys);
  color: var(--silver);
}

.search-empty {
  padding: 4px 6px;
  font: 14px var(--font-sys);
  color: var(--silver);
}
</style>
