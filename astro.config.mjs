// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // TODO: set to your real domain before deploying (used by RSS + sitemap)
  site: "https://retro-astro.example.com",
  // Pages prerender to static HTML by default; opt into on-demand
  // rendering per-route with `export const prerender = false`.
  output: "static",
  adapter: cloudflare({
    // Optimize images at build time; avoids needing the Cloudflare Images binding.
    imageService: "compile",
  }),
  integrations: [mdx(), sitemap()],
});
