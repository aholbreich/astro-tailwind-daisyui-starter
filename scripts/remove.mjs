#!/usr/bin/env node
/**
 * remove.mjs — strip optional dependencies from the starter template.
 *
 * Usage:
 *   node scripts/remove.mjs --daisyui          # remove DaisyUI
 *   node scripts/remove.mjs --alpine           # remove Alpine JS
 *   node scripts/remove.mjs --daisyui --alpine # remove both
 *
 * Or via pnpm scripts:
 *   pnpm remove:daisyui
 *   pnpm remove:alpine
 */

import { execSync }                                from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join }                                    from 'node:path';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const root    = new URL('..', import.meta.url).pathname;
const p       = (...parts) => join(root, ...parts);
const read    = (f)        => readFileSync(f, 'utf8');
const write   = (f, s)     => { writeFileSync(f, s, 'utf8'); ok(`updated  ${rel(f)}`); };
const remove  = (f)        => { if (existsSync(f)) { rmSync(f, { recursive: true }); ok(`removed  ${rel(f)}`); } };
const run     = (cmd)      => execSync(cmd, { cwd: root, stdio: 'inherit' });
const rel     = (f)        => f.replace(root, '');
const ok      = (msg)      => console.log(`  ✓ ${msg}`);
const warn    = (msg)      => console.log(`\n  ⚠  ${msg}`);
const section = (msg)      => console.log(`\n── ${msg} ${'─'.repeat(50 - msg.length)}`);

// ---------------------------------------------------------------------------
// Args
// ---------------------------------------------------------------------------

const args        = process.argv.slice(2);
const removeDaisy = args.includes('--daisyui');
const removeAlpine = args.includes('--alpine');

if (!removeDaisy && !removeAlpine) {
  console.error('Usage: node scripts/remove.mjs [--daisyui] [--alpine]');
  process.exit(1);
}

// ===========================================================================
// DAISYUI
// ===========================================================================

if (removeDaisy) {
  section('Removing DaisyUI');

  // 1. Uninstall the npm package
  run('pnpm remove daisyui');

  // 2. Remove the @plugin directive from theme.css
  const themePath = p('src/styles/theme.css');
  write(themePath, read(themePath).replace(/@plugin "daisyui";\n?/, ''));

  // 3. Remove the demo showcase page and its component folder
  remove(p('src/pages/daisyui.astro'));
  remove(p('src/components/daisyui'));

  // 4. Remove the "DaisyUI" item from the nav in site-config.ts
  const siteConfigPath = p('src/site-config.ts');
  write(
    siteConfigPath,
    read(siteConfigPath).replace(
      /\n\s*\{\s*\n\s*text:\s*["']DaisyUI["'],\s*\n\s*url:\s*["']\/daisyui["'],\s*\n\s*\},?/g,
      '',
    ),
  );

  warn('Manual clean-up still needed:');
  console.log(`
     DaisyUI utility classes (btn, card, navbar, badge, …) remain in your
     component files. Replace or remove them as you restyle the template.

     The @theme block in src/styles/theme.css still has DaisyUI-targeted
     color tokens — review and clean them up if no longer needed.
  `);
}

// ===========================================================================
// ALPINE JS
// ===========================================================================

if (removeAlpine) {
  section('Removing Alpine JS');

  // 1. Uninstall all three Alpine-related packages
  run('pnpm remove alpinejs @astrojs/alpinejs @types/alpinejs');

  // 2. Strip the Alpine import and integration from astro.config.mjs
  const astroCfgPath = p('astro.config.mjs');
  let cfg = read(astroCfgPath);
  cfg = cfg
    .replace(/import alpinejs from "@astrojs\/alpinejs";\n?/,  '')  // import line
    .replace(/,\s*alpinejs\(\)/,                                '')  // trailing position
    .replace(/alpinejs\(\),?\s*/,                               ''); // leading position
  write(astroCfgPath, cfg);

  // 3. Replace ThemeToggle.astro with a vanilla JS version
  //    The Alpine x-data / @click / x-show directives are replaced by a
  //    <script> tag that reads and writes data-theme directly on <html>.
  //    astro:page-load re-inits after each View Transition navigation.
  write(p('src/components/ThemeToggle.astro'), THEME_TOGGLE_VANILLA);

  // 4. Replace Navbar.astro — strip x-data / @click / x-show / x-transition,
  //    wire the mobile menu open/close with a plain event listener block.
  write(p('src/components/nav/Navbar.astro'), NAVBAR_VANILLA);

  warn('Manual clean-up still needed:');
  console.log(`
     Any custom Alpine directives (x-data, @click, x-show, x-transition)
     you added outside the files above will need to be rewritten in
     vanilla JS or another lightweight library.
  `);
}

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------

console.log('\nDone. Run `pnpm build` to verify everything still compiles.\n');

// ===========================================================================
// Replacement component templates
// ===========================================================================

// ── ThemeToggle — vanilla JS ────────────────────────────────────────────────
const THEME_TOGGLE_VANILLA = `\
---
/**
 * ThemeToggle — vanilla JS version (Alpine JS removed).
 *
 * How it works:
 *   Layout.astro sets data-theme on <html> before first paint.
 *   This button reads that attribute, toggles it, and persists to localStorage.
 *   astro:page-load reinitialises the handler after each View Transition.
 */
---

<button id="theme-toggle" class="btn btn-ghost btn-square" aria-label="Toggle theme">
  <!-- Sun — shown when dark mode is active -->
  <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
  <!-- Moon — shown when light mode is active -->
  <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
</button>

<script>
  function initThemeToggle() {
    const btn  = document.getElementById('theme-toggle');
    const sun  = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (!btn || !sun || !moon) return;

    function sync() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      sun.style.display  = dark ? '' : 'none';
      moon.style.display = dark ? 'none' : '';
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      sync();
    });

    sync();
  }

  // Re-init after each View Transition page navigation
  document.addEventListener('astro:page-load', initThemeToggle);
</script>
`;

// ── Navbar — vanilla JS ─────────────────────────────────────────────────────
const NAVBAR_VANILLA = `\
---
import { Icon } from 'astro-icon/components';
import { nav } from 'site-config';
import ThemeToggle from '@components/ThemeToggle.astro';
---

<nav class="navbar max-w-screen-xl mx-auto">
  <div class="navbar-start md:pl-2 lg:pl-8">
    {/* Logo */}
  </div>
  <div class="navbar-center"></div>
  <div class="navbar-end md:pr-2 lg:pr-8">
    {nav.map((item) => (
      <a class="hidden md:inline-flex btn btn-lg btn-ghost hover:bg-base-200" href={item.url}>
        {item.text}
      </a>
    ))}

    <ThemeToggle />

    <button id="mobile-open" class="btn btn-square btn-ghost md:hidden" aria-label="Menü öffnen">
      <Icon name="nav" />
    </button>

    <!-- Mobile Menu Fullscreen -->
    <div id="mobile-menu" class="fixed inset-0 bg-primary flex flex-col items-center justify-center space-y-6 z-50 hidden">
      <button id="mobile-close" class="absolute top-6 right-6 text-4xl focus:outline-none" aria-label="Menü schließen">
        &times;
      </button>
      {nav.map((item) => (
        <a href={item.url} class="text-2xl text-primary-content hover:text-accent mobile-nav-link">
          {item.text}
        </a>
      ))}
    </div>
  </div>
</nav>

<script>
  function initMobileNav() {
    const openBtn = document.getElementById('mobile-open');
    const closeBtn = document.getElementById('mobile-close');
    const menu = document.getElementById('mobile-menu');
    if (!openBtn || !closeBtn || !menu) return;

    const open  = () => menu.classList.remove('hidden');
    const close = () => menu.classList.add('hidden');

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    // Close when any nav link is clicked (mirrors Alpine's @click="open = false")
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  // Re-init after each View Transition page navigation
  document.addEventListener('astro:page-load', initMobileNav);
</script>
`;
