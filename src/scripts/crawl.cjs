// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */

const { readdirSync } = require("fs");
const { resolve, sep } = require("path");

/**
 * @param {string} directory
 * @param {"directories" | "files" | "both"} [filters = "both"]
 * @param {number} [maxDepth = Infinity]
 * @returns {string[]}
 */
function crawl(directory, filters = "both", maxDepth = Infinity) {
  const directories = [directory];
  const temp = [directory];

  for (let i = 0; i < maxDepth; i++) {
    const subDirectories = temp
      .map((path) =>
        readdirSync(resolve(__dirname, path), { withFileTypes: true })
      )
      .flat(1)
      .filter(
        (directory) =>
          filters === "both" ||
          (filters === "directories" && directory.isDirectory()) ||
          (filters === "files" && !directory.isDirectory())
      )
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

module.exports = crawl;
