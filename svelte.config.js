// @ts-check

import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
    paths: {
      base: "/Melvor-Map-Maker",
    },
    serviceWorker: {
      register: false,
    },
    files: {
      serviceWorker: "src/serviceWorker.ts",
    },
    alias: {
      $routes: "src/routes",
      "$routes/*": "src/routes/*",
      $lib: "src/lib",
      "$lib/*": "src/lib/*",
    },
  },
};

export default config;
