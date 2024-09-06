import { Graphics } from "pixi.js";
import { axialToOddQ, oddQToAxial } from "$lib/functions/coordinates";
import type { HexCoordData, PointData } from "$lib/melvor/schema";
import SafeGraphicsContext from "./SafeGraphicsContext";

const SQRT_3 = Math.sqrt(3);
// https://www.redblobgames.com/grids/hexagons/#hex-to-pixel-axial
const FLAT_HEX_ORIENT = {
  forward: [
    [3 / 2, 0],
    [SQRT_3 / 2, SQRT_3],
  ],
} as const;

class HexDisplay extends Graphics {
  private _hexScale!: PointData;
  private _coordinates!: PointData;
  constructor(
    graphicsContext: SafeGraphicsContext,
    hexScale: PointData,
    coordinates: PointData
  ) {
    super({
      cullable: true,
      context: graphicsContext,
      eventMode: "static",
    });

    this.hexScale = hexScale;
    this.coordinates = coordinates;
  }

  public get hexScale(): PointData {
    return this._hexScale;
  }

  public get coordinates(): PointData {
    return this._coordinates;
  }

  public get axialCoordinates(): HexCoordData {
    return oddQToAxial(this.coordinates);
  }

  public set axialCoordinates(coordaintes: HexCoordData) {
    this.coordinates = axialToOddQ(coordaintes);
  }

  public get origin(): PointData {
    return {
      x: this.hexScale.x,
      y: (this.hexScale.y * SQRT_3) / 2,
    };
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
