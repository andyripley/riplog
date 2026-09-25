---
title: Using your own components in MDC
description: How to use Vue components inside Nuxt Content while keeping posts editable in Nuxt Studio.
pubDate: 2026-09-20
tags: [mdc, howto]
mood: nerdy
---

Nuxt Content uses Markdown Components, or MDC, to make Vue components available inside a post without executable imports or JSX.

This site exposes a few deliberately small components to every post:

- :blink[GeoCities]
- :blink[Angelfire]
- :blink[Tripod]
- :blink[Homestead]

Inline components use single-colon syntax. Block components use a pair of colons and can expose editable slots and typed props:

```mdc
::marquee{behavior="alternate" color="var(--accent)"}
This text remains editable in Nuxt Studio.
::
```

Put reusable components in `app/components/`. Nuxt auto-discovers them, and Studio presents component props through its editor. Posts can live in subfolders too; the folder path remains part of the URL.

Unlike MDX, MDC does not run arbitrary imports, exports, or JavaScript expressions inside content. Dynamic behavior belongs in the Vue component while editable words stay in Markdown slots.
