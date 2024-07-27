// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */

const { version } = require("../../package.json");

const { writeFileSync } = require("fs");
const { resolve } = require("path");

const ENV = {
  PUBLIC_VERSION: version,
};

const ENV_PATH = resolve(__dirname, "../../.env");

const envEntries = Object.entries(ENV);
let envString = "";

for (const [key, value] of envEntries) {
  console.log(`[writeEnv] | Setting ${key} = ${value}`);
  envString += `${key}=${value}\n`;
}

writeFileSync(ENV_PATH, envString);
