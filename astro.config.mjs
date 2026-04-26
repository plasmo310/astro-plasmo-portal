// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: [
      "content.elekibear.com",
      "raw.githubusercontent.com",
      "user-images.githubusercontent.com",
      "play.google.com",
      "apps.apple.com",
    ],
  },
});
