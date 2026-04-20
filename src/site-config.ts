export const siteConfig = {
  title: "My Astro Site",
  description: "This is a fantastic Astro site",
  githubRepo: "aholbreich/astro-tailwind-daisyui-starter",
  // Keep in sync with `site` in astro.config.mjs (used as fallback in robots.txt)
  site: "https://example.com",

  // Used in SEOmeta for Twitter card and Open Graph
  seo: {
    twitterHandle: "@yourhandle",
    twitterSite: "https://yoursite.com",
  },
};

// Feature flags examples
export const featureFlags = {
  enableBetaFeatures: false,
  enableImprint: true,
  enableDataprotection: false,
  showAttribution: true, // Show "Made by" footer link — set false to remove
};

// Navigation menu items
export const nav = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "Blog",
    url: "/blog",
  },
  {
    text: "DaisyUI",
    url: "/daisyui",
  },
  {
    text: "404",
    url: "/404",
  },
];
