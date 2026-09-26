<script setup lang="ts">
const props = withDefaults(defineProps<{ digits?: number }>(), { digits: 6 });
const count = ref("0".repeat(props.digits));

onMounted(async () => {
  try {
    const counted = sessionStorage.getItem("hit-counted");
    const hits = await $fetch<number>("/api/hits", {
      method: counted ? "GET" : "POST",
    });
    sessionStorage.setItem("hit-counted", "1");
    count.value = String(hits).padStart(props.digits, "0");
  }
  catch {
    // Keep zero placeholder when storage or API is unavailable.
  }
});
</script>

<template>
  <div class="counter-wrap">
    <div class="label">
      You are visitor number
    </div>
    <div
      class="counter"
      aria-live="polite"
    >
      <span
        v-for="(digit, index) in count"
        :key="index"
        class="digit"
      >
        {{ digit }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.counter-wrap {
  text-align: center;
  margin: 0.8em 0;
}

.label {
  font-size: 13px;
  font-family: var(--font-sys);
  margin-bottom: 4px;
}

.counter {
  display: inline-flex;
  gap: 2px;
  background: var(--bg-dark);
  border: 3px inset var(--silver);
  padding: 3px;
}

.counter :global(.digit) {
  font: bold 20px var(--font-mono);
  color: var(--red);
  background: linear-gradient(
    var(--bg-dark) 0 48%,
    var(--bg-highlight) 48% 52%,
    var(--bg-dark) 52%
  );
  padding: 0 3px;
  min-width: 1ch;
  text-shadow: 0 0 6px var(--red);
}
</style>
