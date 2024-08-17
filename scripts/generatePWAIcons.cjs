// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */

const { resolve } = require("path");
const { existsSync, readFileSync, writeFileSync } = require("fs");
const JSDOM = require("jsdom").JSDOM;
const generateAssets =
  require("@vite-pwa/assets-generator/api/generate-assets").generateAssets;
const generateHTMLMarkup =
  require("@vite-pwa/assets-generator/api/generate-html-markup").generateHtmlMarkup;
const generateManifestIconsEntry =
  require("@vite-pwa/assets-generator/api/generate-manifest-icons-entry").generateManifestIconsEntry;
const generateInstructions =
  require("@vite-pwa/assets-generator/api/instructions").instructions;

const BASE_IMAGE_LOCATION = resolve(__dirname, "../static/favicon.svg");
const OUT_DIRECTORY = resolve(__dirname, "../static");
const APP_HTML_LOCATION = resolve(__dirname, "../src/app.html");
const MANIFEST_LOCATION = resolve(__dirname, "../static/manifest.webmanifest");

(async () => {
  if (!existsSync(OUT_DIRECTORY)) {
    throw new Error(
      `[generatePWAIcons] | Out directory does not exist. Directory: ${OUT_DIRECTORY}`
    );
  }

  if (!existsSync(APP_HTML_LOCATION)) {
    throw new Error(
      `[generatePWAIcons] | Could not locate app.html. Directory searched: ${APP_HTML_LOCATION}`
    );
  }

  if (!existsSync(OUT_DIRECTORY)) {
    throw new Error(
      `[generatePWAIcons] | Could not locate manifest. Directory searched: ${OUT_DIRECTORY}`
    );
  }

  const instructions = await generateInstructions({
    imageName: "favicon.svg",
    imageResolver: () => readFileSync(BASE_IMAGE_LOCATION),
    resolveSvgName: (name) => name,
    basePath: "%sveltekit.assets%/",
    htmlLinks: {
      xhtml: false,
      includeId: false,
    },
    preset: "minimal-2023",
  });

  await generateAssets(instructions, true, OUT_DIRECTORY, (message) => {
    console.log(`[generatePWAIcons] | ${message}`);
  });

  const htmlMarkup = generateHTMLMarkup(instructions);
  const manifestEntry = generateManifestIconsEntry("object", instructions);

  addHTMLMarkup(htmlMarkup, APP_HTML_LOCATION);
  addIconsIntoManifest(manifestEntry, MANIFEST_LOCATION);
})();

/**
 * @param { string[] } markup
 * @param { string } htmlFileLocation
 */
function addHTMLMarkup(markup, htmlFileLocation) {
  const root = new JSDOM(readFileSync(htmlFileLocation));

  [...root.window.document.head.children]
    .filter((element) => element.getAttribute("pwa") === "true")
    .forEach((element) => element.remove());

  const htmlMarkup = new JSDOM(markup.join("")).window.document.head.children;
  [...htmlMarkup].forEach((element) => element.setAttribute("pwa", "true"));
  root.window.document.head.append(...htmlMarkup);

  const serialised = root.serialize();

  writeFileSync(htmlFileLocation, serialised);

  console.log("[generatePWAIcons] | Added HTML Markup");
}

/**
 * @param { import("@vite-pwa/assets-generator/dist/api.d.ts").ManifestIcons } manifestEntry
 * @param { string} manifestLocation
 */
function addIconsIntoManifest(manifestEntry, manifestLocation) {
  /** @type { {icons: import("@vite-pwa/assets-generator/dist/api.d.ts").ManifestIcon[] } } */
  const manifest = JSON.parse(readFileSync(manifestLocation, "utf-8"));
  manifest.icons = manifestEntry.icons;

  for (const icon of manifest.icons) {
    icon.src = `/Melvor-Map-Maker/${icon.src}`;
  }

  const serialised = JSON.stringify(manifest);
  writeFileSync(manifestLocation, serialised);

  console.log("[generatePWAIcons] | Added icons into manifest");
}
