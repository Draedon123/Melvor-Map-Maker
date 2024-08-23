// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */

// https://github.com/sveltejs/kit/issues/12039
// https://github.com/TorstenDittmann/kit/commit/0edfe6994cef889466ec907388cdb31c497938e1

const { readFileSync, writeFileSync, existsSync } = require("fs");
const { resolve } = require("path");

const SVELTE_KIT_DEV_FILE_LOCATION = resolve(
  __dirname,
  "../node_modules/@sveltejs/kit/src/exports/vite/dev/index.js"
);
const PRAGMA = "patched";

(() => {
  if (!existsSync(SVELTE_KIT_DEV_FILE_LOCATION)) {
    throw new Error(
      `[patchServiceWorkers] | Could not find SvelteKit Dev File. Directory searched: ${SVELTE_KIT_DEV_FILE_LOCATION}`
    );
  }

  let fileContents = readFileSync(SVELTE_KIT_DEV_FILE_LOCATION, "utf-8");
  if (fileContents.startsWith(`// ${PRAGMA}`)) {
    console.log("[patchServiceWorkers] | Service Workers already patched");
    return;
  }

  fileContents = `// ${PRAGMA}\n${fileContents}`;
  fileContents = fileContents.replace(
    "`import '${to_fs(resolved)}';`",
    "`import '${svelte_config.kit.paths.base + to_fs(resolved)}';`"
  );

  writeFileSync(SVELTE_KIT_DEV_FILE_LOCATION, fileContents);
  console.log("[patchServiceWorkers] | Patched service workers");
})();
