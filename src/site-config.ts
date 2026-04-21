export const siteConfig = {
  title: "Your Site",
  description: "Minimal Astro site built with Tailwind CSS and DaisyUI.",
  githubRepo: "aholbreich/astro-tailwind-daisyui-starter",
  // Keep in sync with `site` in astro.config.mjs (used as fallback in robots.txt)
  site: "https://example.com",
  footerText: "Replace this with your company or site name.",

  // Used in SEOmeta for Twitter card and Open Graph
  seo: {
    twitterHandle: "@yourhandle",
    twitterSite: "https://example.com",
  },
};

// Feature flags examples
export const featureFlags = {
  enableImprint: true,
  enableDataprotection: false,
  showAttribution: false, // Show starter attribution in the footer if you want it
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
];
