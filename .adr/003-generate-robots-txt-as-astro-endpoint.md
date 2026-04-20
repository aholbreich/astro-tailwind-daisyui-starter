# 3. Generate robots.txt as Astro endpoint

Status: Accepted
Status Date: 2026-04-20
Driver: Alexander Holbreich
Contributors: —

## Context

The starter previously shipped a static `public/robots.txt` with a generic
`User-agent: * / Allow: /` body and no `Sitemap:` directive. The sitemap URL
depends on the production domain configured in `astro.config.mjs` → `site`.
A static file cannot read that value, so the sitemap reference had to be
added manually — easy to forget, easy to get wrong.

Additionally, the static file contained `Disallow: /contact/` which references
a page that does not exist in the template, misleading anyone who copy-pastes.

## Decision

Replace `public/robots.txt` with `src/pages/robots.txt.ts` — a prerendered
Astro API route. The route reads `site` from Astro's config context and emits
the correct `Sitemap:` URL at build time. `export const prerender = true`
ensures the file is emitted as a static asset in all output modes.

### Consequences

- `Sitemap:` is always correct as long as `site` in `astro.config.mjs` is set.
- The file is generated into `dist/robots.txt` at build time, identical in
  behaviour to a static file from the crawler's perspective.
- A fallback `siteConfig.site` string is used if Astro's `site` is not
  configured, so the build never crashes on an unconfigured project.

## Options considered

### Option 1: Static `public/robots.txt`
Simple, but cannot embed the sitemap URL dynamically. The URL must be
maintained manually — a common source of forgotten or wrong entries.

### Option 2: Astro API route (chosen)
Slightly more complex but correct by construction. The sitemap URL stays
in sync with the rest of the config automatically.

## Advices

Add `Disallow:` entries for paths that should not be indexed (e.g. `/admin/`,
`/api/`). Keep the route lean — it only needs to return plain text.
