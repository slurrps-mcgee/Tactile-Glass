# TactileGlass

A utility-first and component-based CSS framework that unites **neumorphism**, **glassmorphism**, and a **hybrid** of both — aligned with Bootstrap 5.3-style layout, forms, helpers, and utilities, while staying **CSS-only** (no JS runtime required for components).

Components are generic (`tg-btn`, `tg-card`, `tg-nav`, `tg-sidebar`). Materials are separate classes (`tg-neu`, `tg-glass`, `tg-hybrid`) driven by CSS tokens. Bootstrap-style modifiers (`btn-sm`, `btn-primary`, `btn-icon`) and Tailwind-style utilities (`d-flex`, `p-4`, `bg-white`, `theme-dark`) stack on top.

- **Version:** 0.3.0
- npm: [`tactileglass-css`](https://www.npmjs.com/package/tactileglass-css)
- Docs: [slurrps-mcgee.github.io/Tactile-Glass](https://slurrps-mcgee.github.io/Tactile-Glass/)
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
| Component | `tg-btn`, `tg-card`, `tg-dropdown`, `tg-nav`, `tg-sidebar` | Skeleton — layout, type, radius, behavior |
| Style | `tg-neu`, `tg-glass`, `tg-glass-frosted`, `tg-hybrid`, `tg-neu-reverse` | Token-driven surface paint |
| Modifiers + utilities | `btn-sm`, `btn-icon`, `btn-primary`, `p-4`, `bg-white`, `border-none` | Same names on every style |

```html
<button class="tg-btn tg-hybrid btn-primary">Save</button>

<button type="button" class="tg-btn tg-neu btn-icon" aria-label="Menu">…</button>

<section class="tg-card tg-glass-frosted tg-interactive card-sm">…</section>

<details class="tg-dropdown tg-glass-frosted">…</details>

<aside class="tg-sidebar tg-neu">…</aside>

<header class="tg-nav tg-neu tg-neu-reverse nav-sm">…</header>
```

Pick one style per node. Do not mix `tg-neu` with `tg-glass` on the same element. Compound parts such as `.nav-links` inherit depth from the parent — do not put inset classes on the links.

### Styles

- **neu** — raised or sunken clay (`tg-neu`, `tg-neu-reverse`, `tg-neu-surface`, `tg-neu-inset`). Tokens: `--tg-neu-shadow-drop`, `--tg-neu-shadow-inset`.
- **glass** — acrylic pane (`tg-glass`). Showcase frost: `tg-glass-frosted` (blur + inset glow + edge sheen). Tokens: `--tg-glass-bg`, `--tg-glass-blur`, `--tg-glass-shadow`, `--tg-glass-menu-blur`.
- **hybrid** — glass fill inside a tactile shadow. Token: `--tg-hybrid-bg` plus neu shadows.

Prefer style classes on any element. `morph-*` mirrors the same matrix with `!important` for overrides. `--clr-*` / `--glass-*` stay aliases of `--tg-*`.

## What’s included

Bootstrap-inspired coverage, organized the same way as the Sass tree:

| Area | Highlights |
| --- | --- |
| **Layout** | Breakpoints, `container` / `container-*`, flex `.row` / `.col-*`, gutters, CSS grid tracks, z-index |
| **Content** | Reboot, typography, images, figures, tables |
| **Forms** | Form control, select, checks / switches, range, input group, floating labels, layout, validation |
| **Helpers** | Clearfix, color-bg, colored links, focus ring, ratio, stacks, stretched link, text truncation, VR, visually hidden |
| **Utilities** | Flex, spacing, display, sizing, overflow, position, colors, borders, shadows, morph, opacity, visibility, object-fit, interactions |
| **Components** | Accordion, alerts, badges, breadcrumb, buttons / button group / `btn-icon`, cards, close, collapse, dropdowns, list group, navbar, navs & tabs, pagination, placeholders (shimmer), progress, sidebar, spinners, theme toggle |

Menus use **`tg-dropdown`** (`<details>` + `.dropdown-menu`) — CSS-only, no select-based menu control.

## Dark mode

Add `theme-dark` to `<html>` (or any subtree) to invert canvas, ink, glass, and neu shadows. `theme-light` forces a light island inside a dark page. `data-theme="dark"` / `data-theme="light"` work the same way.

```html
<html class="theme-dark">
  …
</html>

<section class="theme-dark p-6 rounded-lg">Dark island</section>
```

The docs site toggle is a `theme-toggle` on a `tg-btn btn-icon`. Persist the choice on `document.documentElement`.

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

Layout is mobile-first with Bootstrap infixes. Use flex rows (`.row`, `.col-md-6`) or CSS grid tracks (`.grid`, `.grid-md-3`, `.grid-12`). Gutters: `g-3`, `gx-4`, `gy-2`. Display: `d-none d-md-flex`. Do not use Tailwind colon prefixes (`md:p-4`) or JIT arbitrary values (`p-[5px]`).

Navbars collapse with a CSS-only `<details class="nav-collapse nav-expand-md">` that holds only the hamburger. Put `.nav-links` as a sibling under `.tg-nav`. Keep `theme-toggle` in `.nav-end` on the top row. From 768px up the links stay in a row and the hamburger hides. Depth (`tg-neu-reverse`, `tg-neu-surface`, `tg-neu-inset`) lives on the `tg-nav` parent — not on `.nav-links`.

Sidebars use `tg-sidebar` with the same material classes. Docs use a full-height neu inset nav that scrolls independently of the main column.

## Docs site

The GitHub Pages site lives in `docs/` at the repo root. GitHub Actions compiles the Sass on every push to `main` and deploys it — you do not commit `tactileglass.css`.

| Page | What it is |
| --- | --- |
| `index.html` | Thin redirect → `docs.html` (so `/` works on Pages) |
| `docs.html` | Getting started — install, tokens, contribute |
| `customize.html` | CSS variable overrides and live theme demos |
| `layout.html` | Breakpoints, containers, flex row, CSS grid, gutters |
| `content.html` | Reboot, typography, images, tables, figures |
| `forms.html` | Form controls, validation, floating labels |
| `components.html` | Component gallery (accordion → spinners) |
| `helpers.html` | Clearfix, stacks, ratio, stretched-link, a11y helpers |
| `utilities.html` | Spacing, color, flex, shadows, morph |

Docs chrome highlights:

- **Split-scroll shell** — locked sidebar, scrolling main; neu shadows preserved with scrollport gutters
- **Topnav** — logo (TG mark + title on desktop; mark only, centered on mobile), theme / npm / GitHub as `tg-btn btn-icon`
- **Mobile drawer** — CSS checkbox overlay from the left
- **Sidebar active state** — syncs to URL hash, click, and scroll
- **Brand assets** — `docs/logo/` (SVG mark + lockup); icons in `docs/icons/` (Bootstrap Icons subset + npm mark)

```bash
npm install
npm run dev
```

`dev` compiles Sass into both `dist/` and `docs/`, then opens [http://127.0.0.1:8080/docs.html](http://127.0.0.1:8080/docs.html).

After the first push of `.github/workflows/pages.yml`, set **Settings → Pages → Source** to **GitHub Actions**. The live site is:

https://slurrps-mcgee.github.io/Tactile-Glass/

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run sass:build` | Compile `dist/tactileglass.css` and copy into `docs/` |
| `npm run sass:watch` | Rebuild docs CSS on Sass changes |
| `npm run serve` | Vite docs server (opens `/docs.html`) |
| `npm run build` | Compile + minify |
| `npm run dev` | Watch + serve |

`dist/` and `docs/tactileglass.css` are gitignored. Run `sass:build` (or `dev`) after a clone. CI builds the CSS for GitHub Pages. The published npm package includes `dist` and `src/scss`.

## Source layout

```text
src/scss/
├── tactileglass.scss
├── base/            # tokens, themes, reset, mixins, typography
├── styles/          # neu, glass, hybrid mixins + public classes
├── layout/          # breakpoints, container, gutters, row, grid, flex, z-index
├── content/         # reboot, typography, images, figures, tables
├── forms/           # controls, checks, range, input-group, floating labels, validation
├── helpers/         # ratio, stacks, visually-hidden, …
├── animations/      # keyframes + motion utilities
├── components/      # buttons, cards, nav, sidebar, accordion, …
└── utilities/       # flex, spacing, display, morph, shadows, …
```

Keep class names unambiguous: component, then material, then modifiers, then utilities.

## License

[MIT](LICENSE) © 2026 Kenneth Lamb
