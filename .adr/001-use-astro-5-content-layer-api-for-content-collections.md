# 1. Use Astro 5 Content Layer API for content collections

Status: Accepted
Status Date: 2026-04-20
Driver: Alexander Holbreich
Contributors: —

## Context

The starter needed a content authoring story. Astro 5 ships a new Content Layer
API that replaces the legacy `src/content/config.ts` approach used in Astro 2–4.
The legacy approach still works in Astro 5 but is no longer recommended and will
not receive new features.

The new API requires:
- config at `src/content.config.ts` (project root, not inside `src/content/`)
- a `loader` per collection (e.g. `glob()` from `astro/loaders`)
- Zod schemas for frontmatter validation, with types generated into `.astro/content.d.ts`

## Decision

Use the Astro 5 Content Layer API exclusively. The starter ships with a typed
`blog` collection using the `glob()` loader and a Zod schema. A shared
`seoFields` Zod fragment is extracted so future collections can reuse the
`title` + `description` pair without repeating it.

### Consequences

- Frontmatter errors surface at build time, not at runtime.
- `.astro/content.d.ts` must be included in `tsconfig.json` alongside
  `.astro/types.d.ts` for collection types to resolve in editors.
- The legacy `Astro.glob()` API must not be used; `getCollection()` is the
  correct replacement.
- `CollectionEntry<'blog'>` must be imported explicitly in page frontmatter
  when using `getStaticPaths()` — TypeScript cannot infer it from the function
  return type alone in the current Astro TS plugin version.

## Options considered

### Option 1: Legacy content collections (Astro 2–4 style)
`src/content/config.ts` with `defineCollection()` and no `loader`. Still
works in Astro 5 but deprecated. Ruled out — starters should model current
best practice.

### Option 2: Content Layer API with `file()` loader
For single-file data sources (JSON, YAML). Not appropriate for per-post
Markdown files. Reserved for future data collections if needed.

### Option 3: Manual MDX imports via `import.meta.glob()`
More flexible but loses type safety and build-time validation. Ruled out.

## Advices

When adding a second collection, extract the Zod schema into its own file
(e.g. `src/content/schemas/blog.ts`) rather than inlining it in
`content.config.ts` to keep the config file readable.
