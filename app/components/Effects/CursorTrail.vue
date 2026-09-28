<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

const sparkles = new Set<HTMLSpanElement>();
let handleMouseMove: ((event: MouseEvent) => void) | undefined;

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;

  if (reduce || !fine) return;

  const colors = [
    "var(--yellow)",
    "var(--accent)",
    "var(--link)",
    "var(--text)",
    "var(--lime)",
  ];
  const glyphs = ["\u2726", "\u2727", "\u22C6", "*"];
  let last = 0;

  handleMouseMove = (event) => {
    const now = performance.now();
    if (now - last < 40) return;
    last = now;

    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent
      = glyphs[Math.floor(Math.random() * glyphs.length)] ?? "*";
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;
    sparkle.style.color
      = colors[Math.floor(Math.random() * colors.length)] ?? "var(--yellow)";

    const removeSparkle = () => {
      sparkle.remove();
      sparkles.delete(sparkle);
    };

    sparkles.add(sparkle);
    document.body.appendChild(sparkle);
    sparkle.addEventListener("animationend", removeSparkle, { once: true });
  };

  window.addEventListener("mousemove", handleMouseMove);
});

onBeforeUnmount(() => {
  if (handleMouseMove) {
    window.removeEventListener("mousemove", handleMouseMove);
  }

  for (const sparkle of sparkles) {
    sparkle.remove();
  }
  sparkles.clear();
});
</script>

<template>
  <span
    class="cursor-trail-anchor"
    aria-hidden="true"
  />
</template>

<style>
.cursor-trail-anchor {
  display: none;
}

.sparkle {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  font-size: 14px;
  transform: translate(-50%, -50%);
  animation: sparkle-fall 0.9s ease-out forwards;
}

@keyframes sparkle-fall {
  to {
    opacity: 0;
    transform: translate(-50%, 30px) scale(0.3) rotate(180deg);
  }
}
</style>
