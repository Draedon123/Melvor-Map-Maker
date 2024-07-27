// @ts-check

/* eslint-disable @typescript-eslint/no-require-imports */

const { resolve, sep, join } = require("path");
const { readdirSync, existsSync, writeFileSync } = require("fs");

const BUILD_DIRECTORY = resolve(__dirname, "../../build");
const ROUTES_DIRECTORY = resolve(__dirname, "../routes");

if (!existsSync(BUILD_DIRECTORY)) {
  throw new Error(`Build directory at ${BUILD_DIRECTORY} does not exist`);
}

if (!existsSync(ROUTES_DIRECTORY)) {
  throw new Error(`Routes directory at ${ROUTES_DIRECTORY} does not exist`);
}

const routes = crawlDirectories(ROUTES_DIRECTORY)
  .filter((directory) => readdirSync(directory).includes("+page.svelte"))
  .map((directory) => directory.slice(ROUTES_DIRECTORY.length + 1));

for (const route of routes) {
  if (route === "") {
    continue;
  }

  console.log(`Creating redirect for route ${route}\n`);

  writeFileSync(
    join(BUILD_DIRECTORY, `${route}.html`),
    `
<script>
  const { protocol, host } = window.location
  window.location.href = \`\${protocol}//\${host}/Melvor-Map-Maker/#route=${encodeURIComponent(route)}\`;
</script>
`.replace(/\n| {2,}/g, "")
  );
}

/**
 * @param {string} directory
 * @param {number} [maxDepth = Infinity]
 * @returns {string[]}
 */
function crawlDirectories(directory, maxDepth = Infinity) {
  const directories = [directory];
  const temp = [directory];

  for (let i = 0; i < maxDepth; i++) {
    const subDirectories = temp
      .map((path) =>
        readdirSync(resolve(__dirname, path), { withFileTypes: true })
      )
      .flat(1)
      .filter((dirent) => dirent.isDirectory())
      .map((directory) => `${directory.path}${sep}${directory.name}`);

    if (i === 0) {
      temp.splice(0, 1);
    }

    directories.push(...subDirectories);
    temp.splice(0, temp.length);
    temp.push(...subDirectories);

    if (subDirectories.length === 0) {
      break;
    }
  }

  return directories;
}
