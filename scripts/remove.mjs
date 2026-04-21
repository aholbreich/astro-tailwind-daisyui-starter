#!/usr/bin/env node
/**
 * remove.mjs — strip Alpine JS from the starter template.
 *
 * Usage:
 *   node scripts/remove.mjs --alpine
 *
 * Or via pnpm:
 *   pnpm remove:alpine
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const p = (...parts) => join(root, ...parts);
const read = (file) => readFileSync(file, "utf8");
const write = (file, content) => {
  writeFileSync(file, content, "utf8");
  console.log(`  ✓ updated ${file.replace(root, "")}`);
};
const run = (command) => execSync(command, { cwd: root, stdio: "inherit" });

const args = process.argv.slice(2);
const removeAlpine = args.includes("--alpine");

if (!removeAlpine) {
  console.error("Usage: node scripts/remove.mjs --alpine");
  process.exit(1);
}

console.log("\n── Removing Alpine JS ─────────────────────────────────");

run("pnpm remove alpinejs @astrojs/alpinejs @types/alpinejs");

const astroConfigPath = p("astro.config.mjs");
let astroConfig = read(astroConfigPath);
astroConfig = astroConfig
  .replace(/import alpinejs from "@astrojs\/alpinejs";\n?/, "")
  .replace(/,\s*alpinejs\(\)/, "")
  .replace(/alpinejs\(\),?\s*/, "");
write(astroConfigPath, astroConfig);

// These replacements keep the starter working after Alpine is removed.
write(p("src/components/ThemeToggle.astro"), THEME_TOGGLE_VANILLA);
write(p("src/components/nav/Navbar.astro"), NAVBAR_VANILLA);

console.log(`
  ⚠  Manual clean-up still needed:

     Any custom Alpine directives (x-data, @click, x-show, x-transition)
     you added outside the files above will need to be rewritten in
     vanilla JS or another lightweight library.
`);

console.log("\nDone. Run `pnpm build` to verify everything still compiles.\n");

const THEME_TOGGLE_VANILLA = `\
---
/**
 * ThemeToggle — vanilla JS version used after Alpine is removed.
 *
 * Layout.astro sets data-theme before first paint. This component toggles the
 * current value and persists the choice in localStorage.
 */
---

<button id="theme-toggle" class="btn btn-ghost btn-square" aria-label="Toggle theme">
  <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
  <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
</button>

<script>
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (!btn || !sun || !moon) return;

    function sync() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      sun.style.display = dark ? '' : 'none';
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

  document.addEventListener('astro:page-load', initThemeToggle);
</script>
`;

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

    const open = () => menu.classList.remove('hidden');
    const close = () => menu.classList.add('hidden');

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  document.addEventListener('astro:page-load', initMobileNav);
</script>
`;
