# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
