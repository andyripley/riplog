# Personal Site / Riplog

Personal blog with a 90s Angelfire/GeoCities presentation and a modern Nuxt 4 stack.

## Stack

- Nuxt 4 and Vue 3
- Nuxt Content and self-hosted Nuxt Studio
- NuxtHub with Cloudflare D1
- Cloudflare Workers and Workers Static Assets

## Development

Tools are pinned with mise:

```sh
mise install
mise exec -- pnpm install
mise exec -- pnpm dev
```

Run all local gates with:

```sh
mise exec -- pnpm check
mise exec -- pnpm lint
mise exec -- pnpm format:check
mise exec -- pnpm build
mise exec -- pnpm test:output
```

`mise exec -- pnpm preview` builds the Cloudflare Worker, applies D1 migrations to local Wrangler storage, and starts Wrangler. Run `mise exec -- pnpm smoke` in another terminal while it is listening on port 8787.

Local production-mode Studio fails closed until OAuth variables are supplied. Set `EXPECT_STUDIO=true` when running smoke tests against an environment with configured Studio authentication.

Cloudflare and Studio setup is documented in `docs/cloudflare-setup.md`.
