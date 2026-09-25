<script setup lang="ts">
import { computed } from "vue";

interface Props {
  direction?: "left" | "right";
  behavior?: "scroll" | "alternate";
  duration?: number;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "left",
  behavior: "scroll",
  color: "var(--lime)",
});

const resolvedDuration = computed(
  () => props.duration ?? (props.behavior === "scroll" ? 18 : 12),
);
</script>

<template>
  <div
    :class="['marquee', behavior, direction]"
    :style="{
      '--marquee-color': color,
      '--marquee-duration': `${resolvedDuration}s`,
    }"
  >
    <span class="track">
      <slot />
    </span>
  </div>
</template>

<style scoped>
.marquee {
  container-type: inline-size;
  overflow: hidden;
  white-space: nowrap;
  color: var(--marquee-color);
  font-family: var(--font-display);
}

.marquee:hover .track,
.marquee:focus-within .track {
  animation-play-state: paused;
}

.track {
  display: inline-block;
  animation: marquee-scroll var(--marquee-duration) linear infinite;
}

.alternate .track {
  animation-name: marquee-bounce;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
}

.right .track {
  animation-direction: reverse;
}

.right.alternate .track {
  animation-direction: alternate-reverse;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(100cqw);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes marquee-bounce {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100cqw - 100%));
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee {
    white-space: normal;
  }
}
</style>
