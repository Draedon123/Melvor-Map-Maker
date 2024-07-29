// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */

const { resolve, join } = require("path");
const { readdirSync, existsSync, writeFileSync } = require("fs");
const crawl = require("./crawl.cjs");

const BUILD_DIRECTORY = resolve(__dirname, "../../build");
const ROUTES_DIRECTORY = resolve(__dirname, "../routes");

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

const routes = crawl(ROUTES_DIRECTORY, "directories")
  .filter((directory) => readdirSync(directory).includes("+page.svelte"))
  .map((directory) => directory.slice(ROUTES_DIRECTORY.length + 1));

for (const route of routes) {
  if (route === "") {
    continue;
  }

  console.log(`[addRedirects] | Creating redirect for route ${route}`);

  writeFileSync(
    join(BUILD_DIRECTORY, `${route}.html`),
    `
<script>
  const { protocol, host } = window.location;
  window.location.href = \`\${protocol}//\${host}/Melvor-Map-Maker/#route=${encodeURIComponent(route)}\`;
</script>
`
  );
}
