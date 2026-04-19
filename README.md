# Astro + Tailwind CSS 4 + DaisyUI 5 Starter

> A minimal, production-ready Astro 5 starter with Tailwind CSS 4, DaisyUI 5, and optional Alpine JS — designed to be understood and deleted from, not worked around.

[Live Demo](https://astro-start-tailwind.vercel.app/) &nbsp;·&nbsp;
[Report a bug](https://github.com/aholbreich/astro-tailwind-daisyui-starter/issues/new?template=bug_report.md) &nbsp;·&nbsp;
[Request a feature](https://github.com/aholbreich/astro-tailwind-daisyui-starter/issues/new?template=feature_request.md)

---

## Features

- **Astro 5** — static-first, island architecture
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **DaisyUI 5** — themeable component classes (removable, see below)
- **Alpine JS 3** — minimal reactivity for mobile nav toggle (removable, see below)
- **astro-seo** — SEO meta, Open Graph, Twitter card
- **astro-icon** — SVG icon system with `src/icons/` folder
- **Astro MDX** — Markdown + JSX content support
- **Sitemap** — auto-generated via `@astrojs/sitemap`
- **Netlify adapter** ready (swappable for Vercel, Cloudflare, or static)
- **404 page**, imprint stub, data protection stub
- Single `src/site-config.ts` configuration file

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

All commands are run from the root of the project:

| Command              | Action                                        |
| :------------------- | :-------------------------------------------- |
| `pnpm install`       | Install dependencies                          |
| `pnpm dev`           | Start dev server at `localhost:4321`          |
| `pnpm build`         | Build production site to `./dist/`            |
| `pnpm preview`       | Preview production build locally              |
| `pnpm astro ...`     | Run Astro CLI commands (`astro add`, etc.)    |

---

## Who this is for

Developers who want a clean, working starting point for an Astro site with utility-first CSS and component-class UI — without opinionated page layouts, color palettes, or content structures baked in.

This is a **base starter**, not a theme or a page kit. It is deliberately minimal so you can add what you need without untangling what you don't.

---

## What's included

| Area           | What's there                                                      |
| :------------- | :---------------------------------------------------------------- |
| Layout         | Single `Layout.astro` wrapping nav + main + footer                |
| Navigation     | Responsive navbar: desktop links + Alpine-powered mobile overlay  |
| UI components  | DaisyUI button showcase, `Sectionhead`, `Container`               |
| Pages          | `index`, `daisyui` showcase, `404`, `imprint`, `dataprotection`   |
| SEO            | `SEOmeta` component — Open Graph, Twitter card, canonical URL     |
| Styles         | Tailwind + DaisyUI plugin, custom theme tokens, font placeholder  |
| Config         | `src/site-config.ts` — title, description, nav, SEO, feature flags |
| Icons          | `astro-icon` wired up, `src/icons/` folder ready                  |
| Content folder | `src/content/` ready for Astro content collections                |
| CI             | GitHub Actions build check on push/PR                             |

---

## What's intentionally not included

- Authentication or user sessions
- CMS or content collection schema (start from `@astrojs/content-collections`)
- Dark mode toggle (DaisyUI supports it natively — wire it up yourself)
- Blog, portfolio, or landing page templates
- i18n routing
- Database or API layer
- Any analytics or tracking

---

## Project structure

```
/
├── .github/
│   ├── workflows/ci.yml        Build check on push/PR
│   └── ISSUE_TEMPLATE/         Bug report + feature request templates
├── public/                     Static assets (favicon, robots.txt, webmanifest)
├── src/
│   ├── components/
│   │   ├── daisyui/            DaisyUI component examples (safe to delete)
│   │   ├── elements/           Layout primitives: Container, Sectionhead
│   │   └── nav/                Responsive Navbar
│   ├── icons/                  SVG icons for astro-icon
│   ├── content/                Astro content collections
│   ├── layouts/
│   │   └── Layout.astro        Base page layout
│   ├── pages/                  File-based routing
│   ├── styles/
│   │   ├── global.css          Tailwind entry point + custom component classes
│   │   ├── theme.css           DaisyUI plugin + custom theme tokens
│   │   └── fonts.css           Web font declarations
│   └── site-config.ts          Site-wide configuration
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Customization entry points

### 1. Site config — `src/site-config.ts`

Change the site title, description, navigation items, SEO handles, and feature flags.

```ts
export const siteConfig = {
  title: "My Site",
  description: "...",
  seo: {
    twitterHandle: "@yourhandle",
    twitterSite: "https://yoursite.com",
  },
};
```

### 2. Theme — `src/styles/theme.css`

Swap DaisyUI themes, override Tailwind color tokens, or remove DaisyUI entirely.

### 3. Fonts — `src/styles/fonts.css`

Add `@font-face` or Google Fonts `@import` declarations here.

### 4. Layout — `src/layouts/Layout.astro`

Change the base HTML shell, `<html lang>`, global `<head>` additions.

### 5. Adapter — `astro.config.mjs`

Swap `adapter: netlify()` for Vercel, Cloudflare, or remove for static output.

---

## Removing DaisyUI

1. Remove `@plugin "daisyui";` from `src/styles/theme.css`
2. Uninstall the package:
   ```bash
   pnpm remove daisyui
   ```
3. Replace `btn`, `navbar`, `badge`, etc. classes in components with your own styles.

## Removing Alpine JS

1. Remove `alpinejs()` from `integrations` in `astro.config.mjs`
2. Uninstall:
   ```bash
   pnpm remove alpinejs @astrojs/alpinejs @types/alpinejs
   ```
3. Replace `x-data`, `x-show`, `@click` attributes in `Navbar.astro` with vanilla JS or a framework of your choice.

---

## Deployment

The starter ships with the **Netlify adapter**. To deploy elsewhere:

| Platform         | Adapter                    | Install                          |
| :--------------- | :------------------------- | :------------------------------- |
| Netlify          | `@astrojs/netlify`         | included                         |
| Vercel           | `@astrojs/vercel`          | `pnpm add @astrojs/vercel`       |
| Cloudflare Pages | `@astrojs/cloudflare`      | `pnpm add @astrojs/cloudflare`   |
| Static (no SSR)  | none                       | remove `adapter:` line           |

After swapping adapters, update `astro.config.mjs`:

```js
import vercel from "@astrojs/vercel";
// ...
adapter: vercel(),
```

> Set `site` in `astro.config.mjs` to your production URL — required for sitemap generation and canonical SEO URLs.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Roadmap

- Add more DaisyUI component examples
- Add dark mode toggle example
- Add MDX content collection demonstration
- Add sitemap configuration example

---

## License

[MIT](./LICENSE) — Alexander Holbreich
