import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        tags: z.array(z.string()).default([]),
        mood: z.string().optional(),
        nowPlaying: z.string().optional(),
      }),
    }),
    pages: defineCollection({
      type: "page",
      source: "*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
  },
});
