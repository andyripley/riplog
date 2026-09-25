---
name: 90s-web-design
description: Retro 1990s personal-homepage look (GeoCities/Angelfire) built with modern, accessible HTML/CSS. Use when user asks for 90s, retro, Y2K, GeoCities, Angelfire, webring, marquee, blink, hit counter, guestbook, or "old web" styling.
---

# 90s Web Design, Modern Build

Look old. Build new. Recreate the aesthetic; never the obsolete tech.

## Rules

- Semantic HTML5 (`header`, `nav`, `main`, `aside`, `footer`). Valid, lint-clean.
- No `<marquee>`, `<blink>`, `<font>`, `<center>`, frames, spacer GIFs, image-map nav, layout tables, Flash, autoplay audio, popups.
- CSS custom properties for palette, fonts, color roles. Components own their styles; small global layer.
- Accessibility non-negotiable:
  - WCAG AA contrast, incl. text on gradients/tiled backgrounds.
  - All animation off under `prefers-reduced-motion`; content still readable (wrap, not clip).
  - Motion >5s must pause (hover + `:focus-within`).
  - Visible `:focus-visible`. Real `<button>`/`<a>`, not clickable divs/images.
  - Decorative GIFs/emoji: `alt=""` or `aria-hidden="true"`. No text baked into images.
  - Blink sparingly: ≤3 flashes/s; never on essential content.
- Responsive: fixed-width look on desktop, single column on mobile.
- Performance: self-host fonts (`font-display: swap`), modern image formats, `loading="lazy"`, minimal JS. Progressive enhancement for dynamic widgets.

## Era → Modern

| 90s | Build with |
|---|---|
| `<marquee>` | Wrapper `overflow:hidden; white-space:nowrap; container-type:inline-size`; inner `inline-block` animates `translateX(100cqw)` → `translateX(-100%)`. Bounce: `0` → `calc(100cqw - 100%)`, `alternate`. |
| `<blink>` | `@keyframes blink{50%{visibility:hidden}}`, `step-end infinite` |
| Table layout | Grid/flex; fake table look with `border:4px ridge`. If `<table>` anyway: `role="presentation"`, blocks on mobile. |
| Bevel button | `border:2px outset`; `:active{border-style:inset}`; silver bg, system font |
| Rainbow/WordArt text | `background-clip:text; color:transparent` + gradient; animate `background-position`. Static gradient for headings. |
| Glow | `text-shadow:0 0 4px currentColor,0 0 10px currentColor` |
| Rainbow `<hr>` | `border:0; height:6px; background:linear-gradient(90deg,…)` |
| Tiled/starfield bg | CSS gradients or small tile; solid panel behind text for contrast |
| NEW!/HOT! badge | Inline element, auto-expire by date logic |
| Hit counter | Server endpoint + KV/DB, fetched client-side; monospace digits; hide on failure |
| Guestbook | Server form: validate, rate limit, anti-spam, escape output |
| Webring | `<nav aria-label="Webring">` prev/random/next links |
| Under Construction | GIF `alt=""` or CSS stripes; sparingly |
| `<font color>` | Color-role vars / utility classes |
| "Best viewed in…" | Joke footer text only; no browser sniffing |

## Aesthetic

- Palette: dark bg + neon accents (cyan link, purple visited, yellow hover, magenta accent). Raw palette vars → semantic roles (`--bg`, `--panel`, `--text`, `--link`, `--visited`, `--hover`, `--accent`, `--border`, `--rainbow`).
- Fonts: body `"Times New Roman", serif`; display legible sans (Atkinson Hyperlegible → Verdana); mono `"Courier New"`; UI `"MS Sans Serif", Tahoma`. No Comic Sans body text.
- Chrome: centered banner, left sidebar nav, `ridge`/`outset` borders, rainbow dividers, footer badges + counter.
- Copy can be cheesy; structure and a11y stay serious.

## Checklist

- [ ] No obsolete elements in built HTML (grep)
- [ ] Reduced motion: no animation, no clipped text
- [ ] Marquee pauses on hover/focus
- [ ] AA contrast everywhere
- [ ] Keyboard nav + visible focus
- [ ] Mobile single column
- [ ] Lint, type check, build clean
