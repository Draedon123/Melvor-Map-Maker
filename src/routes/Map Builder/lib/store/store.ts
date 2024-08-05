import time from "$lib/functions/time";
import { type IViewportTransformState } from "pixi-viewport";
import {
  Application,
  Container,
  Sprite,
  type ApplicationOptions,
} from "pixi.js";
import { writable } from "svelte/store";
import Viewport from "../canvas/Viewport";
import type { ViewportOptions } from "../canvas/Viewport";

type MapBuilderStore = {
  app: Application | null;
  viewport: Viewport | null;
  lastViewport: IViewportTransformState | null;
  backgroundLayer: Container<Sprite>;
};

type CanvasIntialisationOptions = {
  canvas: HTMLCanvasElement;
  appOptions?: Omit<Partial<ApplicationOptions>, "canvas">;
  viewportOptions?: ViewportOptions;
};

const store = writable<MapBuilderStore>({
  app: null,
  viewport: null,
  lastViewport: null,
  backgroundLayer: new Container({ label: "Background Layer" }),
});

async function initialiseApp(
  options: CanvasIntialisationOptions
): Promise<Application> {
  const app = new Application();

  await time(async () => {
    await app.init({
      canvas: options.canvas,
      ...options.appOptions,
    });
  }, "Initialise PIXI App");

  store.update(($store) => {
    $store.app = app;

    $store.viewport = new Viewport(app, store, options.viewportOptions);
    $store.viewport.moveToLastViewport();

    app.stage.addChild($store.viewport);

    return $store;
  });

  return app;
}

export default store;
export { initialiseApp };
export type { MapBuilderStore };
