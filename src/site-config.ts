// Define the configuration for the site
export const siteConfig = {
  title: "My Astro Site",
  description: "This is a fantastic Astro site",
  githubRepo: "aholbreich/astrostart_TD"
};

// Feature flags examles
export const featureFlags = {
  enableBetaFeatures: false,
  enableImprint: true,
  enableDataprotection: false,
};

// Navigation menu items
export const nav = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "Daisyui",
    url: "/saisyui/",
  },
  {
    text: "404",
    url: "/404/",
  },
  
];