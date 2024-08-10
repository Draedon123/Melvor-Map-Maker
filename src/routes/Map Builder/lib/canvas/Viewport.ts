import * as PIXI_Viewport from "pixi-viewport";
import { Application } from "pixi.js";
import type {
  IViewportOptions,
  IDragOptions,
  IDecelerateOptions,
  IPinchOptions,
  IWheelOptions,
} from "pixi-viewport";
import type { MapBuilderStore } from "../store/store";
import { get, type Writable } from "svelte/store";

type ViewportOptions = {
  constructorOptions?: Omit<Partial<IViewportOptions>, "events">;
  pluginOptions?: {
    dragOptions?: IDragOptions;
    decelerateOptions?: IDecelerateOptions;
    pinchOptions?: IPinchOptions;
    wheelOptions?: IWheelOptions;
  };
};

// when running the app in dev, svelte seems to say that Viewport is undefined
// so it just defaults to a random constructor
// in production, everything works fine
const _Viewport = PIXI_Viewport.Viewport ?? Array;

class Viewport extends _Viewport {
  public baseScale: number;
  constructor(
    private readonly app: Application,
    private readonly store: Writable<MapBuilderStore>,
    options: ViewportOptions = {}
  ) {
    super({
      events: app.renderer.events,
      screenWidth: app.canvas.offsetWidth,
      screenHeight: app.canvas.offsetHeight,
      ...options.constructorOptions,
    });

    this.label = "Viewport";
    this.baseScale = 1;
    this.addChildAt(get(store).backgroundLayer, 0);
    this.addChildAt(get(store).hexGridLayer, 1);

    this.drag(options.pluginOptions?.dragOptions)
      .decelerate(options.pluginOptions?.decelerateOptions)
      .pinch(options.pluginOptions?.pinchOptions)
      .wheel(options.pluginOptions?.wheelOptions);

    this.on("drag-start", () => {
      this.interactiveChildren = false;
    });

    this.on("drag-end", () => {
      this.interactiveChildren = true;
    });

    this.on("moved", this.updateLastViewport);
    this.on("zoomed", () => {
      this.updateLastViewport();
      get(store)
        .hexGridLayer.removeChildren()
        .forEach((hexGraphic) => {
          hexGraphic.destroy(true);
        });

      get(store).hexGridLayer.populate(
        get(store).mapDimensions,
        this,
        get(store).hexesX,
        get(store).hexesY
      );
    });
  }

  public moveToLastViewport(): void {
    const lastViewport = get(this.store).lastViewport;

    this.store.update(($store) => {
      if (lastViewport !== null && $store.viewport !== null) {
        $store.viewport.position.set(lastViewport.x, lastViewport.y);
        $store.viewport.scale.set(lastViewport.scaleX, lastViewport.scaleY);
      }

      return $store;
    });
  }

  public updateLastViewport(): void {
    this.store.update(($store) => {
      $store.lastViewport = this.lastViewport ?? null;

      return $store;
    });
  }

  public centerViewport(): void {
    const shortestSideLength =
      this.screenWidthInWorldPixels < this.screenHeightInWorldPixels
        ? this.screenWidthInWorldPixels
        : this.screenHeightInWorldPixels;

    const shortestSide =
      this.screenWidthInWorldPixels < this.screenHeightInWorldPixels
        ? "width"
        : "height";

    this.width = shortestSideLength;
    this.height = shortestSideLength;

    this.position.set(0);

    this.position.x =
      shortestSide === "width" ? 0 : this.screenWidth / 2 - this.width / 2;
    this.position.y =
      shortestSide === "height" ? 0 : this.screenHeight / 2 - this.height / 2;

    this.baseScale = this.scale.y;
  }
}

export default Viewport;
export type { ViewportOptions };
