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
  /** @type {string[]} */
  const files = [];
  const directories = [directory];
  const temp = [directory];

  for (let i = 0; i < maxDepth; i++) {
    const directoryContents = temp
      .map((path) =>
        readdirSync(resolve(__dirname, path), { withFileTypes: true })
      )
      .flat(1);

    const directoryFiles =
      filters === "files" || filters === "both"
        ? directoryContents.filter((directory) => directory.isFile())
        : [];
    const subDirectories = directoryContents.filter((directory) =>
      directory.isDirectory()
    );

    const subDirectoryNames = subDirectories.map(
      (directory) => `${directory.parentPath}${sep}${directory.name}`
    );
    const fileNames = directoryFiles.map(
      (directory) => `${directory.parentPath}${sep}${directory.name}`
    );

    if (i === 0) {
      temp.splice(0, 1);
    }

    directories.push(...subDirectoryNames);
    files.push(...fileNames);
    temp.splice(0, temp.length);
    temp.push(...subDirectoryNames);

    if (directoryContents.length === 0) {
      break;
    }
  }

  return filters === "both"
    ? [...directories, ...files]
    : filters === "directories"
      ? directories
      : files;
}

module.exports = crawl;
