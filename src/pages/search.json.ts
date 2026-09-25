import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";

export interface SearchDoc {
  url: string;
  title: string;
  description: string;
  tags: string[];
  body: string;
}

/** Reduce raw MDX to plain searchable text. */
function toPlainText(mdx: string): string {
  return mdx
    .replace(/^\s*(import|export)\s.*$/gm, "") // ESM lines
    .replace(/```[^\n]*\n/g, "") // code fence markers (keep code text)
    .replace(/<[^>]+>/g, " ") // JSX / HTML tags
    .replace(/\{[^}]*\}/g, " ") // JSX expressions
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links/images -> text
    .replace(/[#*_`>|~]/g, " ") // markdown syntax
    .replace(/\s+/g, " ")
    .trim();
}

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const docs: SearchDoc[] = posts.map((p) => ({
    url: `/blog/${p.id}/`,
    title: p.data.title,
    description: p.data.description,
    tags: p.data.tags,
    body: toPlainText(p.body ?? ""),
  }));
  return Response.json(docs);
};
