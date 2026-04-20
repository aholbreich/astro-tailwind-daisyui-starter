# Astro + Tailwind CSS 4 + DaisyUI 5 Starter

> A minimal, production-ready Astro 5 starter with Tailwind CSS 4, DaisyUI 5, and optional Alpine JS — designed to be understood and deleted from, not worked around.

[Live Demo](https://astro-start-tailwind.vercel.app/) &nbsp;·&nbsp;
[Report a bug](https://github.com/aholbreich/astro-tailwind-daisyui-starter/issues/new?template=bug_report.md) &nbsp;·&nbsp;
[Request a feature](https://github.com/aholbreich/astro-tailwind-daisyui-starter/issues/new?template=feature_request.md)

---

## Features

- **Astro 5** — static-first, island architecture
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **DaisyUI 5** — themeable component classes (removable — see [Removing optional deps](#removing-optional-dependencies))
- **Alpine JS 3** — minimal reactivity for mobile nav and theme toggle (removable)
- **Dark mode toggle** — flash-free, persists to `localStorage`, respects OS preference
- **View Transitions** — SPA-like page navigation via `<ClientRouter />`
- **Blog** — typed content collection with listing and post pages
- **Inter Variable** font — self-hosted via Fontsource, no Google tracking
- **astro-seo** — SEO meta, Open Graph, Twitter card
- **astro-icon** — SVG icon system with `src/icons/` folder
- **Astro MDX** — Markdown + JSX content support
- **Sitemap** — auto-generated via `@astrojs/sitemap`
- **Accessibility** — skip-to-content link, `prefers-reduced-motion` support
- **Netlify adapter** ready (swappable for Vercel, Cloudflare, or static)
- **404 page**, imprint stub, data protection stub
- Single `src/site-config.ts` configuration file
- **CI** — `astro check` + build on every push/PR

---

## Quickstart

```bash
pnpm create astro@latest --template aholbreich/astro-tailwind-daisyui-starter
```

Or clone directly:

```bash
git clone https://github.com/aholbreich/astro-tailwind-daisyui-starter.git my-project
cd my-project
pnpm install
pnpm dev
```

---

## Commands

| Command                 | Action                                              |
| :---------------------- | :-------------------------------------------------- |
| `pnpm install`          | Install dependencies                                |
| `pnpm dev`              | Start dev server at `localhost:4321`                |
| `pnpm build`            | Build production site to `./dist/`                  |
| `pnpm preview`          | Preview production build locally                    |
| `pnpm astro ...`        | Run Astro CLI commands (`astro add`, etc.)          |
| `pnpm remove:daisyui`   | Strip DaisyUI from the project (see below)          |
| `pnpm remove:alpine`    | Strip Alpine JS from the project (see below)        |

---

## Who this is for

Developers who want a clean, working starting point for an Astro site with utility-first CSS and component-class UI — without opinionated page layouts, color palettes, or content structures baked in.

This is a **base starter**, not a theme or a page kit. It is deliberately minimal so you can add what you need without untangling what you don't.

---

## What's included

| Area              | What's there                                                              |
| :---------------- | :------------------------------------------------------------------------ |
| Layout            | Single `Layout.astro` wrapping nav + main + footer                        |
| Navigation        | Responsive navbar: desktop links + Alpine-powered mobile overlay          |
| Dark mode         | Flash-free toggle in navbar, persisted to `localStorage`                  |
| Blog              | `/blog` listing + `/blog/[id]` post pages, typed content collection       |
| UI components     | DaisyUI button showcase, `Sectionhead`, `Container`                       |
| Pages             | `index`, `blog`, `daisyui` showcase, `404`, `imprint`, `dataprotection`   |
| SEO               | `SEOmeta` component — Open Graph, Twitter card, canonical URL             |
| Styles            | Tailwind + DaisyUI plugin, Inter font, custom theme tokens                |
| Config            | `src/site-config.ts` — title, description, nav, SEO, feature flags        |
| Icons             | `astro-icon` wired up, `src/icons/` folder ready                          |
| Content           | `src/content.config.ts` with typed `blog` collection (Zod schema)        |
| Accessibility     | Skip-to-content link, `prefers-reduced-motion` CSS guard                  |
| CI                | GitHub Actions: `astro check` + build on push/PR, release workflow        |

---

## What's intentionally not included

- Authentication or user sessions
- Portfolio, landing page, or full theme templates
- i18n routing
- Database or API layer
- Any analytics or tracking

---

## Project structure

```
/
├── .github/
│   └── workflows/
│       ├── ci.yml              astro check + build on push/PR
│       └── release.yml         syncs package.json version on git tag push
├── scripts/
│   └── remove.mjs              strips DaisyUI and/or Alpine JS (see below)
├── src/
│   ├── components/
│   │   ├── daisyui/            DaisyUI component examples (safe to delete)
│   │   ├── elements/           Layout primitives: Container, Sectionhead
│   │   ├── nav/
│   │   │   └── Navbar.astro    Responsive navbar with mobile overlay
│   │   ├── ThemeToggle.astro   Dark/light mode button
│   │   ├── Footer.astro
│   │   └── SEOmeta.astro
│   ├── content/
│   │   └── blog/               Markdown/MDX blog posts
│   ├── icons/                  SVG icons for astro-icon
│   ├── layouts/
│   │   └── Layout.astro        Base page layout
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro     Post listing
│   │   │   └── [id].astro      Individual post
│   │   ├── index.astro
│   │   ├── daisyui.astro
│   │   ├── robots.txt.ts       Generated robots.txt (uses site URL from config)
│   │   └── 404.astro
│   ├── styles/
│   │   ├── global.css          Tailwind entry point + utilities
│   │   ├── theme.css           DaisyUI plugin + custom theme tokens
│   │   └── fonts.css           Inter Variable font import
│   ├── content.config.ts       Typed content collections (Astro 5 Content Layer)
│   └── site-config.ts          Site-wide configuration
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Customization entry points

### 1. Site config — `src/site-config.ts`

Title, description, navigation items, SEO handles, and feature flags.

```ts
export const siteConfig = {
  title: "My Site",
  description: "...",
  site: "https://example.com",   // keep in sync with astro.config.mjs → site
  seo: {
    twitterHandle: "@yourhandle",
    twitterSite: "https://yoursite.com",
  },
};
```

### 2. Theme — `src/styles/theme.css`

Swap DaisyUI themes, override Tailwind color tokens, or remove DaisyUI entirely.

### 3. Fonts — `src/styles/fonts.css`

Ships with [Inter Variable](https://fontsource.org/fonts/inter) (self-hosted, no runtime network requests). Swap it with any Fontsource package:

```bash
pnpm remove @fontsource-variable/inter
pnpm add @fontsource-variable/geist   # example
```

Then update the `@import` and `font-family` in `fonts.css`.

### 4. Layout — `src/layouts/Layout.astro`

Base HTML shell, `<html lang>`, global `<head>` additions, View Transitions toggle.

### 5. Adapter — `astro.config.mjs`

Swap `adapter: netlify()` for Vercel, Cloudflare, or remove for static output.

| Platform         | Adapter               | Install                        |
| :--------------- | :-------------------- | :----------------------------- |
| Netlify          | `@astrojs/netlify`    | included                       |
| Vercel           | `@astrojs/vercel`     | `pnpm add @astrojs/vercel`     |
| Cloudflare Pages | `@astrojs/cloudflare` | `pnpm add @astrojs/cloudflare` |
| Static (no SSR)  | none                  | remove `adapter:` line         |

> Set `site` in `astro.config.mjs` to your production URL — required for sitemap generation and canonical SEO URLs.

---

## Blog / content collections

The starter includes a typed `blog` collection using Astro 5's Content Layer API.

**Add a post** — create a `.md` or `.mdx` file in `src/content/blog/`:

```md
---
title: My first post
description: A short summary shown in listings and meta tags.
pubDate: 2024-06-01
draft: false
---

Your content here.
```

**Schema** (`src/content.config.ts`) — all fields are validated at build time:

| Field           | Type      | Required | Notes                              |
| :-------------- | :-------- | :------- | :--------------------------------- |
| `title`         | `string`  | yes      |                                    |
| `description`   | `string`  | yes      | Used in listings and meta tags     |
| `pubDate`       | `date`    | yes      | Accepts ISO strings (`"2024-01-15"`) |
| `updatedDate`   | `date`    | no       | Shown below the title if set       |
| `heroImage`     | `string`  | no       | URL or path, rendered via `<Image />`|
| `draft`         | `boolean` | no       | `true` → excluded from listings    |

---

## Removing optional dependencies

The script `scripts/remove.mjs` handles the mechanical parts of stripping DaisyUI or Alpine JS. Run one or both flags together:

```bash
pnpm remove:daisyui
pnpm remove:alpine
node scripts/remove.mjs --daisyui --alpine   # both at once
```

### `--daisyui`

What the script does automatically:

- Uninstalls the `daisyui` package
- Removes `@plugin "daisyui";` from `src/styles/theme.css`
- Deletes `src/pages/daisyui.astro` and `src/components/daisyui/`
- Removes the "DaisyUI" item from the nav in `src/site-config.ts`

What still needs manual attention:

- DaisyUI utility classes (`btn`, `card`, `navbar`, `badge`, …) remain in component HTML — replace them as you restyle
- The `@theme` color tokens in `theme.css` may reference DaisyUI variables — review and clean up

### `--alpine`

What the script does automatically:

- Uninstalls `alpinejs`, `@astrojs/alpinejs`, `@types/alpinejs`
- Removes the Alpine import and `alpinejs()` integration from `astro.config.mjs`
- Rewrites `ThemeToggle.astro` with a vanilla JS equivalent
- Rewrites `Navbar.astro` (mobile menu) with a vanilla JS equivalent

Both replacements use `astro:page-load` so they survive View Transition navigations.

What still needs manual attention:

- Any custom Alpine directives (`x-data`, `@click`, `x-show`) you added outside the template files need to be rewritten in vanilla JS or another library

---

## Releasing

This repo uses standard semver. The recommended release flow:

```bash
pnpm version patch   # 0.5.0 → 0.5.1
pnpm version minor   # 0.5.0 → 0.6.0
pnpm version major   # 0.5.0 → 1.0.0
git push && git push --tags
```

`pnpm version` updates `package.json` and creates the git tag in one step.
Pushing the tag triggers `.github/workflows/release.yml`, which creates a GitHub Release with auto-generated notes.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## License

[MIT](./LICENSE) — Alexander Holbreich
