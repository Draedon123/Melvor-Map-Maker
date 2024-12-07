import time from "$lib/functions/time";
import { error } from "$lib/functions/log";
import { initDevtools } from "@pixi/devtools";
import type { Application } from "pixi.js";

const LOG_PREFIX = "initialisePIXIDevTools.ts";
let initialised = false;

function initialisePIXIDevTools(app: Application): void {
  if (initialised) {
    return;
  }

  time(async () => {
    await initDevtools({ app })
      .then(() => {
        initialised = true;
      })
      .catch((errorObject: unknown) => {
        const errorMessage =
          errorObject instanceof Error
            ? errorObject.message
            : "Unspecified error";
        error(LOG_PREFIX, "Failed to initialise PIXI Devtools", errorMessage);
      });
  }, "Initialise PIXI Devtools");
}

export default initialisePIXIDevTools;
