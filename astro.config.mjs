import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";


// https://astro.build/config
export default defineConfig({
  site: "https://example.com", // TODO: replace with your production URL (required for sitemap + SEO)
  trailingSlash: "never",
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/InterVariableLatin.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
      fallbacks: ["sans-serif"],
    },
  ],
  integrations: [mdx(), sitemap(), icon(), alpinejs()],
  vite: {
    plugins: [tailwindcss()],
  },
});
