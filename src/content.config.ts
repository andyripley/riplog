import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// All posts are MDX. Files starting with `_` are ignored.
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/[^_]*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // LiveJournal-style metadata, because of course
    mood: z.string().optional(),
    nowPlaying: z.string().optional(),
  }),
});

export const collections = { blog };
