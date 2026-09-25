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
pnpm install
pnpm dev
```

Run all local gates with:

```sh
pnpm check
pnpm lint
pnpm format:check
pnpm build
pnpm test:output
```

`pnpm preview` builds the Cloudflare Worker, applies D1 migrations to local Wrangler storage, and starts Wrangler.
