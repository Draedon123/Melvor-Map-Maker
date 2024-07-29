import { initDevtools } from "@pixi/devtools";
import type { Application } from "pixi.js";
import { error } from "$lib/functions/log";
import time from "$lib/functions/time";

const LOG_PREFIX = "initialisePIXIDevTools.ts";

function initialisePIXIDevTools(app: Application): void {
  time(async () => {
    await initDevtools({ app }).catch((errorObject: unknown) => {
      const errorMessage =
        errorObject instanceof Error
          ? errorObject.message
          : "Unspecified error";
      error(LOG_PREFIX, "Failed to initialise PIXI Devtools", errorMessage);
    });
  }, "Initialise PIXI Devtools");
}

export default initialisePIXIDevTools;
