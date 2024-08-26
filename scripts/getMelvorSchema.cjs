// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */

(async () => {
  const { resolve } = require("path");
  const { writeFileSync } = require("fs");
  const { compile } = require("json-schema-to-typescript");

  const SCHEMA_URL = "https://melvoridle.com/assets/schema/gameData.json";
  const OUTPUT_DIRECTORY = resolve(__dirname, "../src/lib/melvor/schema.d.ts");

  console.log(`[getMelvorSchema] | Fetching schema from ${SCHEMA_URL}`);
  const schemaResponse = await fetch(SCHEMA_URL);

  if (!schemaResponse.ok) {
    throw new Error(
      `Error while fetching schema. Error code: ${schemaResponse.status}`
    );
  }

  const schemaData = await schemaResponse.json();

  console.log(`[getMelvorSchema] | Compiling schema`);
  const result = await compile(schemaData, "MelvorSchema", {
    format: false,
    maxItems: -1,
    additionalProperties: false,
    style: {
      printWidth: Infinity,
      tabWidth: 0,
    },
  });

  console.log(
    `[getMelvorSchema] | Writing compiled schema to ${OUTPUT_DIRECTORY}`
  );
  writeFileSync(OUTPUT_DIRECTORY, result);
})().catch((error) => {
  const errorMessage =
    error instanceof Error ? error.message : "Unspecified error";
  throw new Error(`[getMelvorSchema] | ${errorMessage}`);
});
