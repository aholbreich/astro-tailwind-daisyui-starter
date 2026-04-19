export const siteConfig = {
  title: "My Astro Site",
  description: "This is a fantastic Astro site",
  githubRepo: "aholbreich/astro-tailwind-daisyui-starter",

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
    text: "DaisyUI",
    url: "/daisyui",
  },
  {
    text: "404",
    url: "/404",
  },
];
