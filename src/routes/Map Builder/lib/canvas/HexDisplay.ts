import { Container, Graphics } from "pixi.js";
import type { PointData } from "$lib/melvor/schema";
import { oddQToAxial } from "$lib/functions/coordinates";
import SafeGraphicsContext from "./SafeGraphicsContext";

const SQRT_3 = Math.sqrt(3);
// https://www.redblobgames.com/grids/hexagons/#hex-to-pixel-axial
const FLAT_HEX_ORIENT = {
  forward: [
    [3 / 2, 0],
    [SQRT_3 / 2, SQRT_3],
  ],
  // https://www.redblobgames.com/grids/hexagons/#hex-to-pixel-axial
  // inverse: [
  //   [2 / 3, 0],
  //   [-1 / 3, SQRT_3 / 3],
  // ],
} as const;

class HexDisplay extends Container {
  private graphic!: Graphics;
  private _graphicsContext!: SafeGraphicsContext;
  private _hexScale!: PointData;
  private _coordinates!: PointData;
  constructor(
    graphicsContext: SafeGraphicsContext,
    hexScale: PointData,
    coordinates: PointData
  ) {
    super({ cullable: true });

    this.graphicsContext = graphicsContext;
    this.hexScale = hexScale;
    this.coordinates = coordinates;
  }

  public get graphicsContext(): SafeGraphicsContext {
    return this._graphicsContext;
  }

  public get hexScale(): PointData {
    return this._hexScale;
  }

  public get coordinates(): PointData {
    return this._coordinates;
  }

  public get origin(): PointData {
    return {
      x: this.hexScale.x,
      y: (this.hexScale.y * SQRT_3) / 2,
    };
  }

  public set graphicsContext(context: SafeGraphicsContext) {
    this._graphicsContext = context;

    if (this.graphic) {
      this.removeChildAt(0);
      this.graphic.destroy(true);
    }

    this.graphic = new Graphics({ context, label: "Graphic" });
    this.addChildAt(this.graphic, 0);
  }

  public set hexScale(scale: PointData) {
    this._hexScale = scale;

    const origin = this.origin;
    this.position.set(origin.x, origin.y);
  }

  public set coordinates(coordinates: PointData) {
    this._coordinates = coordinates;
    const origin = this.origin;

    const { q, r } = oddQToAxial(coordinates);

    const x =
      (FLAT_HEX_ORIENT.forward[0][0] * q + FLAT_HEX_ORIENT.forward[0][1] * r) *
        this.hexScale.x +
      origin.x;
    const y =
      (FLAT_HEX_ORIENT.forward[1][0] * q + FLAT_HEX_ORIENT.forward[1][1] * r) *
        this.hexScale.y +
      origin.y;

    this.position.set(x, y);
    this.label = `Hex Graphic (${coordinates.x}, ${coordinates.y})`;
  }
}

export default HexDisplay;
