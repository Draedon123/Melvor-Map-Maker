import time from "$lib/functions/time";
import * as PIXI_Viewport from "pixi-viewport";
import {
  type IDragOptions,
  type IDecelerateOptions,
  type IPinchOptions,
  type IViewportOptions,
  type IWheelOptions,
} from "pixi-viewport";
import { Application, type ApplicationOptions } from "pixi.js";
import { writable } from "svelte/store";

const Viewport = PIXI_Viewport.Viewport;

type MapBuilderStore = {
  app: Application | null;
  viewport: PIXI_Viewport.Viewport | null;
};

type CanvasIntialisationOptions = {
  canvas: HTMLCanvasElement;
  appOptions?: Omit<Partial<ApplicationOptions>, "canvas">;
  viewportOptions?: ViewportOptions;
};

type ViewportOptions = {
  constructorOptions?: Omit<Partial<IViewportOptions>, "events">;
  pluginOptions?: {
    dragOptions?: IDragOptions;
    decelerateOptions?: IDecelerateOptions;
    pinchOptions?: IPinchOptions;
    wheelOptions?: IWheelOptions;
  };
};

const store = writable<MapBuilderStore>({
  app: null,
  viewport: null,
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

    if ($store.viewport === null) {
      $store.viewport = getViewport(app, options.viewportOptions);
      app.stage.addChild($store.viewport);
    }

    return $store;
  });

  return app;
}

function getViewport(
  app: Application,
  options: ViewportOptions = {}
): PIXI_Viewport.Viewport {
  const viewport = new Viewport({
    events: app.renderer.events,
    screenWidth: app.canvas.offsetWidth,
    screenHeight: app.canvas.offsetHeight,
    ...options.constructorOptions,
  });

  viewport.label = "Viewport";

  viewport
    .drag(options.pluginOptions?.dragOptions)
    .decelerate(options.pluginOptions?.decelerateOptions)
    .pinch(options.pluginOptions?.pinchOptions)
    .wheel(options.pluginOptions?.wheelOptions);

  viewport.on("drag-start", () => {
    viewport.interactiveChildren = false;
  });

  viewport.on("drag-end", () => {
    viewport.interactiveChildren = true;
  });

  return viewport;
}

export default store;
export { initialiseApp };
export type { MapBuilderStore };
