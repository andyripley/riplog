# AGENTS.md

Riplog: personal blog, 90s GeoCities/Angelfire look, modern build. Astro 7 static site + MDX, deployed to Cloudflare Workers.

For design work load skill `90s-web-design` (`.agents/skills/`). Look old, build new: no obsolete HTML, accessibility required.

## Commands

Tools are pinned via mise. Run everything as `mise exec -- pnpm <script>`.

| Script | Purpose |
|---|---|
| `dev` | Astro dev server (local simulated KV) |
| `build` | Build to `dist/` |
| `preview` | Build + `wrangler dev` (real Worker runtime) |
| `check` | `astro check` (types) |
| `lint` / `lint:fix` | ESLint |
| `format` / `format:check` | Prettier |
| `cf-typegen` | Regenerate `.worker/worker-configuration.d.ts`; run after editing `wrangler.jsonc` |
| `deploy` | Build + `wrangler deploy`. Only when asked. |

**Done means:** `check` 0 errors, `lint` clean, `build` succeeds, `format:check` clean for files you touched.

## Layout

- `src/consts.ts`: `SITE` config; `NAV` (only `enable: true` entries render).
- `src/content.config.ts`: blog schema (`title`, `description`, `pubDate`, `updatedDate?`, `tags`, `draft`, `mood?`, `nowPlaying?`).
- `src/content/blog/*.mdx`: posts. Files starting with `_` are ignored; copy `_template.mdx`.
- `src/lib/posts.ts`: `getPosts()` (newest first; drafts only in dev), `formatDate()` (UTC).
- `src/layouts/`: `BaseLayout` (header, sidebar, footer), `PostLayout`.
- `src/components/`: flat folder, one component per file. `mdx.ts` lists components usable in posts without imports.
- `src/styles/`: global CSS only. `index.css` imports `tokens` → `base` → `layout` → `effects`.
- `src/pages/`: routes. `api/hits.ts` = hit counter (KV `HITS`). `search.json.ts` feeds Fuse.js search. `rss.xml.ts`.

## Conventions

- Minimal dependencies. Ask before adding any.
- Ask before making design or architecture choices the user hasn't made.
- Components own their styles in scoped `<style>`. Add to global CSS only for tokens, page chrome, shared effects, `.prose`.
- Colors and fonts come from `tokens.css` variables. Never hardcode hex values in components.
- Import components directly. `mdx.ts` is the only barrel file; add to it only components safe to use many times inside a post.
- Prettier: double quotes, semicolons. ESLint and Prettier stay separate; don't add `eslint-config-prettier`.
- Don't reformat or "fix" files outside the task scope, especially files the user edited.
- Git: short lowercase commit messages. Commit only when asked.

## Gotchas

- `output: "static"`: pages prerender. Anything that runs per request needs `export const prerender = false`. Read bindings via `import { env } from "cloudflare:workers"`.
- Astro `checkOrigin` rejects POSTs with no `Origin` header. When testing with curl, add `-H "Origin: http://localhost:4321"`.
- Worker types clash with DOM types in client `<script>`s. Use `appendChild`, not `append`.
- Scoped styles don't reach slotted MDX content, so post body styles live in global `.prose` (`base.css`).
- Astro inlines small CSS into the HTML. To verify styles, check the built HTML, not just `dist/_astro/*.css`.
- The adapter uses `imageService: "compile"`: images are optimized at build time, with no Images binding needed. It also auto-adds a `SESSION` KV binding.
- pnpm 12 blocks install scripts. Allowed packages are listed in `pnpm-workspace.yaml` under `allowBuilds`.
- TypeScript stays on 6.x because `@astrojs/check` requires <7.
- `site` in `astro.config.mjs` is a placeholder. RSS and sitemap URLs depend on it.
- `.agents/` and `AGENTS.md` are Prettier-ignored on purpose (compact tables save tokens).
- The KV hit counter is not atomic. Acceptable here.
