# AGENTS.md

Riplog: personal blog, 90s GeoCities/Angelfire look, modern build. Nuxt 4 hybrid site + Nuxt Content/Studio, deployed to Cloudflare Workers with NuxtHub and D1.

For design work load skill `90s-web-design` (`.agents/skills/`). Look old, build new: no obsolete HTML, accessibility required.

## Commands

Tools are pinned via mise. Run everything as `mise exec -- pnpm <script>`.

| Script | Purpose |
|---|---|
| `dev` | Nuxt dev server with local NuxtHub data |
| `build` | Build Cloudflare Worker to `.output/` |
| `preview` | Build, apply local D1 migrations, start Wrangler |
| `check` | `nuxt typecheck` |
| `lint` / `lint:fix` | ESLint |
| `format` / `format:check` | Prettier |
| `deploy` | Apply remote D1 migrations + deploy. Only when asked. |

**Done means:** `check` 0 errors, `lint` clean, `build` succeeds, `test:output` passes, `format:check` clean for files touched. Runtime changes also need `preview` + `smoke`.

## Layout

- `nuxt.config.ts`: Nuxt modules, hybrid routes, NuxtHub D1, Studio, Nitro/Workers config.
- `shared/env.ts`: zod-validated environment variables consumed by `nuxt.config.ts`; throws at config load on invalid/missing vars.
- `content.config.ts`: `blog` and `pages` collection schemas.
- `content/blog/*.md`: published posts. Unpublished Studio edits stay in Studio browser drafts, not committed frontmatter drafts.
- `content/about.md`: Studio-editable About page.
- `shared/site.ts`: `SITE` metadata and `NAV`.
- `app/pages/`: public routes. Blog pages explicitly add all post paths to prerendering.
- `app/components/`: flat Vue components, globally available to MDC and Studio.
- `app/assets/css/`: global CSS. `index.css` imports `tokens` → `base` → `layout` → `effects`.
- `server/api/hits.*.ts`: atomic KV hit counter.
- `server/routes/`: RSS and legacy sitemap redirect.
- `docs/cloudflare-setup.md`: production resources, OAuth, Workers Builds, and counter cutover.

## Conventions

- Minimal dependencies. Ask before adding any.
- Ask before making design or architecture choices user hasn't made.
- Components own styles in scoped `<style>`. Add global CSS only for tokens, page chrome, shared effects, `.prose`.
- Colors and fonts come from `tokens.css` variables. Never hardcode hex values in components.
- Components intended for MDC must use editable slots and typed props; no executable code in content.
- Prettier: double quotes, semicolons. ESLint and Prettier stay separate; don't add `eslint-config-prettier`.
- Don't reformat or fix files outside task scope, especially user-edited files.
- Git: short lowercase commit messages. Commit only when asked.

## Gotchas

- Build with `nuxt build`, not `nuxt generate`: Studio OAuth and hit API require Worker runtime.
- Public pages prerender. `/_studio`, `/__nuxt_studio/**`, and `/api/**` stay runtime routes.
- Nuxt Content shares NuxtHub `DB`; Cloudflare D1 ID comes from `NUXT_HUB_CLOUDFLARE_DATABASE_ID`.
- Local builds use a fake D1 ID only for Wrangler emulation. Workers Builds fails if real D1/repository variables are absent.
- D1 migrations don't run automatically during Workers deployment. Keep migration step in `deploy:cloudflare`.
- After schema changes: edit `server/db/schema.ts`, run `db:generate`, inspect generated SQL, then rebuild.
- When testing hit POST directly, send matching `Origin`, e.g. `-H "Origin: http://127.0.0.1:8787"`.
- Studio GitHub OAuth uses runtime `STUDIO_GITHUB_*` secrets plus independent `NUXT_STUDIO_AUTH_SESSION_SECRET`. Never commit them or place them in public runtime config.
- Studio repository coordinates are build variables because Cloudflare Workers Builds isn't auto-detected by Studio.
- Scoped component styles don't reach rendered Markdown. Post-body styles stay in global `.prose` (`base.css`).
- pnpm 12 blocks install scripts. `allowBuilds` decisions live in `pnpm-workspace.yaml`.
- `.agents/` and `AGENTS.md` are Prettier-ignored intentionally.
- Built-in search loads Nuxt Content's SQLite WASM index on first focus; keep initialization lazy.
