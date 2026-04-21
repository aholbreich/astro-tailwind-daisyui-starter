# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Changed
- README rewritten around the repository's core positioning: a production-ready Astro starter with DaisyUI as a default and Alpine as a small optional enhancement layer
- Starter homepage rewritten to present the template as a clean default project instead of a generic demo page
- `src/site-config.ts` defaults tightened: clearer placeholder copy, no `404` nav item, footer text config added, attribution off by default
- `src/pages/daisyui.astro` reframed as a small reference page instead of a component-gallery direction signal
- `package.json` metadata expanded with description, repository links, keywords, Node engine, and a `pnpm check` script
- `CONTRIBUTING.md` clarified to reinforce the production-ready starter scope
- DaisyUI removal support dropped; DaisyUI now remains a fixed part of the default starter story
- Local releases now use guarded `pnpm release:patch|minor|major` scripts instead of relying directly on raw `pnpm version`
- Blog content styling now follows the daisyUI-documented approach: Tailwind utilities for layout plus the Tailwind Typography plugin for rich text

### Fixed
- Blog post content now has built-in readable styles without depending on an uninstalled typography plugin

### Removed
- Unused showcase-style homepage components that made the starter feel more like a demo template

---

## [0.5.0] — 2026-04-20

### Added
- **Dark mode toggle** — `ThemeToggle.astro` with Alpine JS; flash-free via
  `is:inline` init script in `<head>` that resolves theme before first paint
  (localStorage → OS `prefers-color-scheme` → `'light'`)
- **View Transitions** — `<ClientRouter />` added to `Layout.astro`; opt-out
  documented with a comment
- **Inter Variable font** — self-hosted via `@fontsource-variable/inter`;
  applied to `body` in `fonts.css`; no runtime CDN requests (GDPR-friendly)
- **Skip-to-content link** — first focusable element in `<body>`, hidden until
  keyboard-focused; `<main id="main-content">` as the jump target
- **`prefers-reduced-motion` CSS guard** — disables `scroll-behavior: smooth`
  when the OS setting is active; `<ClientRouter />` suppresses transition
  animations natively
- **`robots.txt` as Astro endpoint** — `src/pages/robots.txt.ts` replaces the
  static `public/robots.txt`; `Sitemap:` URL is derived from `astro.config.mjs`
  at build time so it stays correct automatically
- **GitHub release workflow** — `.github/workflows/release.yml` syncs
  `package.json` version to the pushed git tag and creates a GitHub Release
  with auto-generated notes
- **`remove.mjs` script** — `pnpm remove:alpine`
  automates Alpine removal; the script rewrites
  `ThemeToggle.astro` and `Navbar.astro` with vanilla JS equivalents
- **ADR directory** — `.adr/` with five Architecture Decision Records
  documenting key decisions made during this release

### Changed
- `src/site-config.ts` — added `site` field as a fallback for `robots.txt`
  endpoint; kept in sync with `astro.config.mjs → site`
- README fully updated: features list, commands table, project structure,
  new blog and removal-script sections, releasing guide; stale Roadmap removed

### Upgraded
- `astro` 5.14.1 → **5.18.1** (latest Astro 5)
- `@astrojs/alpinejs` 0.4.9 → 0.5.0
- `@astrojs/sitemap` 3.6.0 → 3.7.2
- `alpinejs` 3.15.0 → 3.15.11

### Removed
- `public/robots.txt` — superseded by the Astro endpoint

---

## [0.4.0] — 2026-04-20

### Added
- **Typed blog content collection** — `src/content.config.ts` using Astro 5
  Content Layer API (`glob()` loader + Zod schema with shared `seoFields`
  fragment); generates types into `.astro/content.d.ts`
- **Blog pages** — `/blog` listing (newest-first, draft-filtered) and
  `/blog/[id]` post page with `<Image />` for optional `heroImage`
- **Placeholder blog post** — `src/content/blog/hello-world.md`
- **`@content` path alias** — added to `tsconfig.json`; maps to `src/content/`

### Changed
- `tsconfig.json` — removed non-existent `@lib` and `@utils` aliases; replaced
  `"types": ["astro/client"]` with `"include": ["src", ".astro/types.d.ts",
  ".astro/content.d.ts"]` so generated content types are picked up by
  `astro check`
- `src/env.d.ts` — was empty; now has `/// <reference types="astro/client" />`
  with a comment explaining the division of responsibility with `.astro/types.d.ts`
- `src/site-config.ts` — "Blog" nav item added
- `src/content/README.md` — rewritten to explain the Content Layer structure,
  how to add collections, and a `getCollection()` usage example

---

## [0.3.0] — 2026-04-19

### Added
- GitHub Actions CI workflow (`pnpm build` on push/PR)
- GitHub issue templates (bug report, feature request)
- `CONTRIBUTING.md`
- `showAttribution` feature flag — gates Mindstorm footer attribution
- `siteConfig.seo` — configurable Twitter handle and site URL for SEO meta
- `loading="lazy"` on YouTube embed in `SectionVideo`

### Changed
- `site-config.ts`: corrected `githubRepo` to match actual repo name
- `SEOmeta.astro`: Twitter/OG config now reads from `siteConfig.seo` instead of hardcoded values
- `Footer.astro`: Mindstorm attribution gated behind `featureFlags.showAttribution`
- `Navbar.astro`: fixed invalid Tailwind class `max-w-screen-lx` → `max-w-screen-xl`
- Nav item `/daisyui/` → `/daisyui` (aligned with `trailingSlash: "never"`)
- `global.css`: removed duplicate `@theme` block (canonical location is `theme.css`)
- Dev server port in README corrected to `localhost:4321`
- `imprint.astro`, `dataprotection.astro`: corrected page `title` prop (was "Kontakt")
- README fully rewritten with quickstart, project structure, customization guide, deployment table
- `.gitignore` extended with `.wrangler`, `.vercel`, `.env` patterns

### Fixed
- `Layout.astro`: `<body>` was outside `</html>` — HTML structure corrected
- `Code.astro`: `var` → `const`
- Multiple typos across `SimpleCTA.astro`, `SectionVideo.astro`, `site-config.ts`, `src/icons/README.md`

---

## [0.2.1] — prior

- npm package name fix
- Alpine JS integration added
- CSS refactored into separate files
- Mindstorm component added
