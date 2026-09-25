<script setup lang="ts">
const query = ref("");
const open = ref(false);
const root = useTemplateRef("root");
const input = useTemplateRef("input");
const resultList = useTemplateRef("resultList");
const searchCollection = useSearchCollection("blog", {
  immediate: false,
});
type SearchItem = Awaited<ReturnType<typeof searchCollection.search>>[number];
const results = ref<SearchItem[]>([]);
const { status, init, search } = searchCollection;
let request = 0;

const statusMessage = computed(() => {
  if (status.value === "loading") return "Loading search index";
  if (!open.value) return "";
  return `${results.value.length} result${results.value.length === 1 ? "" : "s"}`;
});

async function load() {
  if (status.value === "idle") await init();
}

async function runSearch() {
  const term = query.value.trim();
  if (term.length < 2) {
    close();
    return;
  }

  const currentRequest = ++request;
  await load();
  const matches = await search(term, {
    limit: 8,
    minTermLength: 2,
    weights: { title: 20, content: 5, heading: 0.5 },
  });
  if (currentRequest !== request) return;
  results.value = matches;
  open.value = true;
}

function close() {
  request++;
  open.value = false;
  results.value = [];
}

function submit() {
  const first = results.value[0];
  if (first) navigateTo(first.id);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    close();
    input.value?.focus();
    return;
  }
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  const links = [...(resultList.value?.querySelectorAll("a") ?? [])];
  if (!open.value || links.length === 0) return;
  event.preventDefault();
  const index = links.indexOf(document.activeElement as HTMLAnchorElement);
  const next = event.key === "ArrowDown" ? index + 1 : index - 1;
  if (next < 0) input.value?.focus();
  else links[Math.min(next, links.length - 1)]?.focus();
}

function onDocumentClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) close();
}

onMounted(() => document.addEventListener("click", onDocumentClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocumentClick));
</script>

<template>
  <div
    ref="root"
    class="search"
    @keydown="onKeydown"
  >
    <form
      role="search"
      class="search-form"
      action="/blog"
      @submit.prevent="submit"
    >
      <label
        for="site-search-input"
        class="sr-only"
      >Search blog posts</label>
      <input
        id="site-search-input"
        ref="input"
        v-model="query"
        class="search-input"
        type="search"
        name="q"
        placeholder="Search posts..."
        autocomplete="off"
        aria-controls="site-search-results"
        aria-describedby="site-search-status"
        :aria-expanded="open"
        @focus="load"
        @input="runSearch"
      >
    </form>
    <div
      id="site-search-status"
      class="sr-only"
      aria-live="polite"
    >
      {{ statusMessage }}
    </div>
    <ul
      v-show="open"
      id="site-search-results"
      ref="resultList"
      class="search-results"
    >
      <li
        v-for="result in results"
        :key="result.id"
      >
        <NuxtLink
          :to="result.id"
          @click="close"
        >
          {{ result.title }}
          <span class="search-desc">{{ result.content.slice(0, 120) }}</span>
        </NuxtLink>
      </li>
      <li
        v-if="results.length === 0"
        class="search-empty"
      >
        No posts found.
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
