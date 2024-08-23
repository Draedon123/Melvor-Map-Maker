/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

import { build, files, version } from "$service-worker";

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = `cache_${version}`;
const IGNORED_FILES = [".nojekyll"].map(
  (filename) => `/Melvor-Map-Maker/${filename}`
);
const ASSETS = [...build, ...files].filter(
  (filename) => !IGNORED_FILES.includes(filename)
);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unspecified error";
          console.error(
            `Error while adding asset to cache.\nAsset: ${asset}\nError message: ${errorMessage}`
          );
        }
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cachedFiles = await caches.keys();

      for (const key of cachedFiles) {
        if (key !== CACHE_NAME) {
          await caches.delete(key);
        }
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    event.request.url.startsWith("chrome-extension://")
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      const url = new URL(event.request.url);
      const cache = await caches.open(CACHE_NAME);

      if (ASSETS.includes(url.pathname)) {
        const response = await cache.match(url.pathname);

        if (response !== undefined) {
          return response;
        }
      }

      try {
        const response = await fetch(url);

        if (!(response instanceof Response)) {
          throw new Error("Invalid response from fetch");
        }

        if (response.status === 200) {
          cache.put(event.request, response.clone());
        }

        return response;
      } catch (error: unknown) {
        const response = await cache.match(event.request);

        if (response !== undefined) {
          return response;
        }

        const errorMessage =
          error instanceof Error ? error.message : "Unspecified error";
        throw new Error(
          `Failed to fetch url ${url.pathname}.\nError message: ${errorMessage}`
        );
      }
    })()
  );
});
