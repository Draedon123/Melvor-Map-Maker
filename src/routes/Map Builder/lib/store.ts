import time from "$lib/functions/time";
import { Application, type ApplicationOptions } from "pixi.js";
import { writable } from "svelte/store";

type MapBuilderStore = {
  app: Application | null;
};

type CanvasIntialisationOptions = {
  canvas: HTMLCanvasElement;
  appInitialisationOptions?: Omit<Partial<ApplicationOptions>, "canvas">;
};

const store = writable<MapBuilderStore>({
  app: null,
});

async function initialiseApp(
  options: CanvasIntialisationOptions
): Promise<Application> {
  const app = new Application();

  await time(async () => {
    await app.init({
      canvas: options.canvas,
      ...options.appInitialisationOptions,
    });
  }, "Initialise PIXI App");

  store.update(($store) => {
    $store.app = app;
    return $store;
  });

  return app;
}

export default store;
export { initialiseApp };
export type { MapBuilderStore };
