# TactileGlass

A utility-first and component-based CSS framework that unites **neumorphism**, **glassmorphism**, and a **hybrid** of both.

Every control ships in three materials. Bootstrap-style modifiers (`btn-sm`, `btn-primary`) and Tailwind-style utilities (`d-flex`, `p-4`, `theme-dark`) stack on top.

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

Three layers, in this order of meaning:

| Layer | Examples | Role |
| --- | --- | --- |
| Component + material | `neu-btn`, `glass-card`, `hybrid-input` | Material first, then the control |
| Modifiers | `btn-sm`, `btn-primary`, `card-interactive`, `nav-sticky` | Same names on every material |
| Utilities | `morph-glass`, `rounded-squircle`, `p-4`, `theme-dark` | Layout, shape, surface, theme |

```html
<button class="neu-btn btn-primary btn-lg">Save</button>

<section class="glass-card card-sm">…</section>

<div class="morph-hybrid rounded-squircle p-6">Custom panel</div>
```

Pick one material per node. Do not mix `neu-btn` with `glass-btn` on the same element.

### Materials

- **neu** — raised or sunken clay. Use for high-frequency controls that should feel physical.
- **glass** — frosted acrylic. Color modifiers become translucent lenses, not solid fills.
- **hybrid** — glass fill sitting inside a tactile shadow. The signature TactileGlass look.

`morph-neu`, `morph-glass`, and `morph-hybrid` paint those surfaces onto any element without turning it into a component.

## Dark mode

Add `theme-dark` to `<html>` (or any subtree) to invert canvas, ink, glass, and neu shadows. `theme-light` forces a light island inside a dark page. `data-theme="dark"` / `data-theme="light"` work the same way.

```html
<html class="theme-dark">
  …
</html>

<section class="theme-dark p-6 rounded-lg">Dark island</section>
```

The docs site toggle is a `theme-toggle` button. Persist the choice on `document.documentElement`.

## Overrides

TactileGlass is token-driven. Recolor an app by reassigning CSS variables after the stylesheet loads — no Sass fork required.

```css
:root {
  --clr-primary: #c084fc;
  --clr-primary-rgb: 192, 132, 252;
  --clr-bg: #c8c2d4;
  --radius-md: 12px;
}
```

Keep the matching `*-rgb` channel in sync when you change a color. Semantic tints use `rgba(var(--clr-primary-rgb), 0.15)`.

A wrapper class scopes the same tokens to a module:

```css
.demo-aurora {
  --clr-primary: #c084fc;
  --clr-primary-rgb: 192, 132, 252;
}
```

Useful tokens: `--clr-primary`, `--clr-dark`, `--clr-bg`, `--glass-bg`, `--hybrid-bg`, `--neu-shadow-drop`, `--neu-shadow-inset`, `--radius-md`, `--font-sans`. Full list: `src/scss/base/_tokens.scss`.

## Layout

`container` is a centered shell that grows with the viewport (540 / 720 / 960 / 1140 / 1320). Start later with `container-sm` through `container-xxl`. `container-fluid` stays full width with the same gutters.

Flex and grid are utilities: `d-flex`, `f-col`, `gap-3`, `grid-3`, `col-span-2`.

## Docs site

The GitHub Pages site lives in `docs/` at the repo root. GitHub Actions compiles the Sass on every push to `main` and deploys it — you do not commit `tactileglass.css`.

| Page | What it is |
| --- | --- |
| `index.html` | Dashboard — install, class language, materials |
| `components.html` | Component catalog, including containers |
| `docs.html` | Open-source documentation |
| `overrides.html` | Live token and theme override examples |

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
├── tactileglass.scss      # entry
├── base/                  # tokens, reset, mixins, typography
├── layouts/               # flexbox, grid
├── components/            # buttons, cards, inputs, navbar, …
└── utilities/             # morph, theme, spacing, colors, borders
```

Keep class names unambiguous: material first, then the control, then modifiers, then utilities.

## License

[MIT](LICENSE) © 2026 Kenneth Lamb
