# TactileGlass

A utility-first and component-based CSS framework that unites **neumorphism**, **glassmorphism**, and a **hybrid** of both.

Components are generic (`tg-btn`, `tg-card`, `tg-nav`). Materials are separate classes (`tg-neu`, `tg-glass`, `tg-hybrid`) driven by CSS tokens. Bootstrap-style modifiers (`btn-sm`, `btn-primary`) and Tailwind-style utilities (`d-flex`, `p-4`, `bg-white`, `theme-dark`) stack on top.

- npm: [`tactileglass-css`](https://www.npmjs.com/package/tactileglass-css)
- Source: [github.com/slurrps-mcgee/Tactile-Glass](https://github.com/slurrps-mcgee/Tactile-Glass)
- License: MIT

## Install

```bash
npm install tactileglass-css
```

Bundler:

```js
import 'tactileglass-css/dist/tactileglass.min.css';
```

HTML:

```html
<link rel="stylesheet" href="node_modules/tactileglass-css/dist/tactileglass.css">
```

Sass entry if you compile it yourself:

```scss
@use 'tactileglass-css/src/scss/tactileglass.scss';
```

## Class language

Two core layers, then modifiers:

| Layer | Examples | Role |
| --- | --- | --- |
| Component | `tg-btn`, `tg-card`, `tg-select`, `tg-nav` | Skeleton — layout, type, radius, behavior |
| Style | `tg-neu`, `tg-glass`, `tg-glass-frosted`, `tg-hybrid`, `tg-neu-reverse` | Token-driven surface paint |
| Modifiers + utilities | `btn-sm`, `btn-primary`, `p-4`, `bg-white`, `border-none` | Same names on every style |

```html
<button class="tg-btn tg-hybrid btn-primary">Save</button>

<section class="tg-card tg-glass-frosted card-sm">…</section>

<details class="tg-select tg-glass-frosted">…</details>

<header class="tg-nav tg-neu tg-neu-reverse nav-sm">…</header>
```

Pick one style per node. Do not mix `tg-neu` with `tg-glass` on the same element. Compound parts such as `.nav-links` inherit depth from the parent — do not put inset classes on the links.

### Styles

- **neu** — raised or sunken clay (`tg-neu`, `tg-neu-reverse`, `tg-neu-surface`, `tg-neu-inset`). Tokens: `--tg-neu-shadow-drop`, `--tg-neu-shadow-inset`.
- **glass** — acrylic pane (`tg-glass`). Showcase frost: `tg-glass-frosted` (blur + inset glow + edge sheen). Tokens: `--tg-glass-bg`, `--tg-glass-blur`, `--tg-glass-shadow`, `--tg-glass-menu-blur`.
- **hybrid** — glass fill inside a tactile shadow. Token: `--tg-hybrid-bg` plus neu shadows.

Prefer style classes on any element. `morph-*` mirrors the same matrix with `!important` for overrides. `--clr-*` / `--glass-*` stay aliases of `--tg-*`.

## Dark mode

Add `theme-dark` to `<html>` (or any subtree) to invert canvas, ink, glass, and neu shadows. `theme-light` forces a light island inside a dark page. `data-theme="dark"` / `data-theme="light"` work the same way.

```html
<html class="theme-dark">
  …
</html>

<section class="theme-dark p-6 rounded-lg">Dark island</section>
```

The docs site toggle is a `theme-toggle` button. Persist the choice on `document.documentElement`.

## Customize

Public API is `--tg-{name}` from the light map in `src/scss/base/_themes.scss`, plus structural tokens in `_tokens.scss`. Dark only patches ink, canvas, shadows, and glass/hybrid fills — pastels inherit. Recolor after the stylesheet loads — no Sass fork required.

```css
:root {
  --tg-primary: #c084fc;
  --tg-primary-rgb: 192, 132, 252;
  --tg-body-bg: #c8c2d4;
  --tg-glass-blur: blur(24px);
  --spacing: 0.25rem;
  --radius-md: 12px;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

Keep the matching `*-rgb` channel in sync. `--tg-body-color` is page ink. `--tg-dark` is the always-dark fill for `btn-dark`. `--spacing` (default `0.25rem`) drives `p-*`, `m-*`, `gap-*`, and `g-*`.

Override groups:

| Group | Examples |
| --- | --- |
| Brand / semantic | `--tg-primary`, `--tg-success`, `--tg-warning`, `--tg-danger`, `--tg-dark` |
| Body / ink | `--tg-body-color`, `--tg-body-bg`, `--tg-link-color`, `--tg-secondary-color` |
| Emphasis / subtle | `--tg-primary-text-emphasis`, `--tg-primary-bg-subtle`, `--tg-primary-border-subtle` |
| Glass / hybrid / neu | `--tg-glass-bg`, `--tg-glass-blur`, `--tg-glass-menu-blur`, `--tg-glass-shadow`, `--tg-hybrid-bg`, `--tg-neu-shadow-drop` |
| Border / radius / shadow / focus | `--tg-border-color`, `--radius-md`, `--tg-box-shadow`, `--tg-focus-ring-color` |
| Type / spacing / breakpoints | `--font-sans`, `--spacing`, `--tg-breakpoint-md` |

Full catalog: docs `customize.html`. Color utilities are fill-only and ink-only: `bg-primary`, `text-body`. Compose a solid chip as `bg-primary text-white`. Beat a material border with `border-none` or `shadow-none`.

## Layout

`container` is a centered shell that grows with the viewport (540 / 720 / 960 / 1140 / 1320). Start later with `container-sm` through `container-xxl`. `container-fluid` stays full width with the same gutters.

Grid is CSS Grid, mobile-first, with Bootstrap infixes: `grid-2` from 0px, `grid-md-2` from 768px. Twelve columns: `grid grid-12` plus `col-12 col-md-6`. Gutters: `g-3`, `gx-4`, `gy-2`. Display: `d-none d-md-flex`. Do not use Tailwind colon prefixes (`md:p-4`) or JIT arbitrary values (`p-[5px]`).

Navbars collapse with a CSS-only `<details class="nav-collapse nav-expand-md">` that holds only the hamburger. Put `.nav-links` as a sibling under `.tg-nav`. Keep `theme-toggle` in `.nav-end` on the top row. From 768px up the links stay in a row and the hamburger hides. Depth (`tg-neu-reverse`, `tg-neu-surface`, `tg-neu-inset`) lives on the `tg-nav` parent — not on `.nav-links`.

## Docs site

The GitHub Pages site lives in `docs/` at the repo root. GitHub Actions compiles the Sass on every push to `main` and deploys it — you do not commit `tactileglass.css`.

| Page | What it is |
| --- | --- |
| `index.html` | Dashboard — install, class language, materials |
| `components.html` | Component catalog |
| `layout.html` | Breakpoints, containers, 12-col grid, gutters |
| `utilities.html` | Spacing scale, display, type, helpers |
| `docs.html` | Open-source documentation |
| `customize.html` | Live token and theme examples |

```bash
npm install
npm run dev
```

`dev` compiles Sass into both `dist/` and `docs/`, then serves [http://127.0.0.1:8080](http://127.0.0.1:8080).

After the first push of `.github/workflows/pages.yml`, set **Settings → Pages → Source** to **GitHub Actions**. The live site is:

https://slurrps-mcgee.github.io/Tactile-Glass/

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run sass:build` | Compile `dist/tactileglass.css` |
| `npm run sass:watch` | Rebuild on Sass changes |
| `npm run serve` | Docs server |
| `npm run build` | Compile + minify |
| `npm run dev` | Watch + serve |

`dist/` and `docs/tactileglass.css` are gitignored. Run `sass:build` (or `dev`) after a clone. CI builds the CSS for GitHub Pages. The published npm package includes `dist` and `src/scss`.

## Source layout

```text
src/scss/
├── tactileglass.scss
├── base/            # tokens, reset, mixins, typography
├── styles/          # neu, glass, hybrid mixins + public classes
├── layouts/         # container, flexbox, grid
├── animations/      # keyframes + motion utilities
├── components/      # tg-btn, tg-card, tg-nav, …
└── utilities/       # morph, theme, spacing, colors, borders
```

Keep class names unambiguous: component, then material, then modifiers, then utilities.

## License

[MIT](LICENSE) © 2026 Kenneth Lamb
