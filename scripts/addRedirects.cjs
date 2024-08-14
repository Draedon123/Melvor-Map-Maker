// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */

const { resolve, join } = require("path");
const { readdirSync, existsSync, writeFileSync, readFileSync } = require("fs");
const { JSDOM } = require("jsdom");
const crawl = require("./crawl.cjs");

const APP_HTML_LOCATION = resolve(__dirname, "../src/app.html");
const BUILD_DIRECTORY = resolve(__dirname, "../build");
const ROUTES_DIRECTORY = resolve(__dirname, "../src/routes");

if (!existsSync(APP_HTML_LOCATION)) {
  throw new Error(
    `[addRedirects] | Could not find app.html at ${APP_HTML_LOCATION}`
  );
}

if (!existsSync(BUILD_DIRECTORY)) {
  throw new Error(
    `[addRedirects] | Build directory at ${BUILD_DIRECTORY} does not exist`
  );
}

if (!existsSync(ROUTES_DIRECTORY)) {
  throw new Error(
    `[addRedirects] | Routes directory at ${ROUTES_DIRECTORY} does not exist`
  );
}

const appHead = readFileSync(APP_HTML_LOCATION, "utf-8");

const routes = crawl(ROUTES_DIRECTORY, "directories")
  .filter((directory) => readdirSync(directory).includes("+page.svelte"))
  .map((directory) => directory.slice(ROUTES_DIRECTORY.length + 1));

for (const route of routes) {
  if (route === "") {
    continue;
  }

  console.log(`[addRedirects] | Creating redirect for route ${route}`);

  const root = new JSDOM(appHead, { contentType: "text/html" });
  [...root.window.document.head.children]
    .filter((child) => child.tagName !== "META")
    .forEach((child) => child.remove());
  const scriptTag = new JSDOM(
    `
      <script>
        const { protocol, host } = window.location;
        window.location.href = \`\${protocol}//\${host}/Melvor-Map-Maker/#route=${encodeURIComponent(route)}\`;
      </script>
    `,
    { contentType: "text/html" }
  ).window.document.head.children[0];

  root.window.document.head.appendChild(scriptTag);
  root.window.document.body.remove();

  const serialised = root.serialize();

  writeFileSync(join(BUILD_DIRECTORY, `${route}.html`), serialised);
}
