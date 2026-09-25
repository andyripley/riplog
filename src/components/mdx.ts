// Components available in every MDX post without importing.
// Spread into <Content components={...} /> in src/pages/blog/[...slug].astro.
// Only add components that are safe to render multiple times inside a post.
export { default as Blink } from "./Blink.astro";
export { default as Marquee } from "./Marquee.astro";
export { default as New } from "./New.astro";
export { default as Rainbow } from "./Rainbow.astro";
export { default as UnderConstruction } from "./UnderConstruction.astro";
