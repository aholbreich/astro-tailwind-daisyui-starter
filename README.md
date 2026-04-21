# astro-tailwind-daisyui-starter

> A production-ready Astro starter with Tailwind CSS 4, DaisyUI 5, blog support, SEO basics, and optional Alpine JS for tiny progressive enhancement.

[Live Demo](https://astro-start-tailwind.vercel.app/) · [Report a bug](https://github.com/aholbreich/astro-tailwind-daisyui-starter/issues/new?template=bug_report.md) · [Request a feature](https://github.com/aholbreich/astro-tailwind-daisyui-starter/issues/new?template=feature_request.md)

## What this is

This repository is a production-ready Astro starter.

It is opinionated enough to be useful, but small enough to understand quickly.
It offers strong defaults and a few clean escape hatches.
It is meant to be friendly to both experienced developers and newcomers who want a clear starting point they can control.

It keeps the stack focused on purpose:

- Astro 5 for the site shell and content-first workflow
- Tailwind CSS 4 for styling
- DaisyUI 5 as the default UI layer
- Alpine JS only where a few lines of client-side behavior are useful

The goal is simple: start quickly, keep control, and ship without unnecessary setup friction.

## Choose this if

- You want a clean Astro starter with strong defaults instead of a blank repo.
- You want DaisyUI included on purpose.
- You want blog/content support, sitemap, SEO basics, icons, dark mode, and accessibility basics already wired up.
- You want example pages and components that are easy to delete.
- You want something production-usable immediately without becoming a large scaffolding system.

## Skip this if

- You want a theme, landing page kit, or large component gallery.
- You want a generator with many install-time choices.
- You want React, Vue, or Svelte in the default stack.
- You want auth, database, API, CMS, or app-style state management included from the start.

## Included

- Astro 5
- Tailwind CSS 4 via `@tailwindcss/vite`
- DaisyUI 5 as the default UI layer
- Alpine JS for small enhancements only
- Typed blog content collection with Markdown and MDX support
- SEO meta component, sitemap, and `robots.txt`
- `astro-icon` with local SVG icons
- Self-hosted Inter Variable font
- Dark mode toggle with no flash on first paint
- Accessibility basics including skip link and reduced-motion support
- Netlify adapter by default, easy to swap
- GitHub Actions CI for `astro check` and build

## Intentionally not included

- A theme or page builder
- A large starter option matrix
- Authentication
- Database or API layer
- Analytics or tracking
- Multiple UI frameworks
- A heavy component library beyond DaisyUI

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

## Commands

| Command               | Action                                   |
| :-------------------- | :--------------------------------------- |
| `pnpm install`        | Install dependencies                     |
| `pnpm dev`            | Start the dev server on `localhost:4321` |
| `pnpm check`          | Run `astro check`                        |
| `pnpm build`          | Build the production site                |
| `pnpm preview`        | Preview the production build locally     |
| `pnpm astro ...`      | Run Astro CLI commands                   |
| `pnpm remove:daisyui` | Convenience script to strip DaisyUI      |
| `pnpm remove:alpine`  | Convenience script to strip Alpine JS    |

## Starter shape

This starter is meant to be understandable at a glance:

- One site config file: `src/site-config.ts`
- One base layout: `src/layouts/Layout.astro`
- A small set of components you can keep or delete
- A minimal blog collection in `src/content/blog/`
- A single DaisyUI reference page you can remove once you no longer need it

## Project structure

```text
/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
├── public/
├── scripts/
│   └── remove.mjs
├── src/
│   ├── components/
│   ├── content/
│   │   └── blog/
│   ├── icons/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── content.config.ts
│   └── site-config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Main customization points

### `src/site-config.ts`

Update the site title, description, production URL, navigation, footer text, and social metadata.

### `src/styles/theme.css`

Adjust DaisyUI and theme tokens. If you want to move away from DaisyUI later, this is one of the main files you will touch.

### `src/layouts/Layout.astro`

Update the HTML shell, view transitions, metadata defaults, and theme bootstrapping.

### `astro.config.mjs`

Set the final `site` URL and swap the deployment adapter if needed.

## Blog support

Posts live in `src/content/blog/`. The included `hello-world.md` is a deletion-friendly sample post that verifies the collection is wired correctly.

Add a post like this:

```md
---
title: My first post
description: A short summary shown in listings and meta tags.
pubDate: 2024-06-01
draft: false
---

Your content here.
```

## Optional removal scripts

`pnpm remove:daisyui` and `pnpm remove:alpine` exist to handle the repetitive parts of removing those pieces from the starter.

They are convenience escape hatches. They are not the main product story, and this repository is not intended to turn into an install wizard or configurable setup system.

If you use them, review the resulting project and clean up any remaining markup or styles that are specific to your site.

## Deployment

The starter currently ships with the Netlify adapter because it is a reasonable default. If you prefer Vercel, Cloudflare, or plain static output, swap the adapter in `astro.config.mjs`.

Set `site` in `astro.config.mjs` to your production URL so sitemap and canonical URLs are correct.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Release flow

This repository uses semver.

```bash
pnpm version patch
git push && git push --tags
```

The release workflow creates a GitHub Release from the pushed tag.

## License

[MIT](./LICENSE)
