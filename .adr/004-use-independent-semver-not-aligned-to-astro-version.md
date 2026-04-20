# 4. Use independent semver not aligned to Astro version

Status: Accepted
Status Date: 2026-04-20
Driver: Alexander Holbreich
Contributors: —

## Context

The idea was raised to version this template in lockstep with Astro's major
version — e.g. publish `5.x.x` while supporting Astro 5, then jump to `6.0.0`
when upgrading to Astro 6. The rationale: users immediately know which Astro
version the template targets.

Arguments against:
- The template depends on multiple majors simultaneously (Astro 5, Tailwind 4,
  DaisyUI 5, Alpine 3). Aligning to one dependency's version ignores the others.
- A jump from `0.x` to `5.0.0` misrepresents maturity — semver `5.0.0` implies
  a stable, production-hardened v5, which this starter is not yet.
- Own changelog becomes meaningless: `5.2.0` → "two Astro patches?" or "two
  new template features?" — indistinguishable.
- npm/GitHub semver readers expect the version to describe the *package's*
  breaking changes, not a dependency's.

## Decision

Use the template's own independent semver. The Astro (and other dependency)
compatibility is documented in the README via a compatibility table. A major
bump (`1.0.0`) signals a breaking change in the *template* itself — the natural
trigger being an Astro major upgrade that requires user action.

### Consequences

- Users must check the README compatibility table to know which Astro version
  a template release targets.
- Releasing follows standard `pnpm version patch|minor|major` flow, which
  updates `package.json` and creates the git tag in one command.

## Options considered

### Option 1: Align major to Astro major (rejected)
Clear for Astro version discovery, but misleading about template maturity,
confuses the changelog, and ignores other major dependencies.

### Option 2: Independent semver (chosen)
Standard npm practice. Compatibility documented in README.

## Advices

Bump to `1.0.0` when the Astro 6 upgrade ships — that is the first genuinely
breaking change a user of this template would encounter.
