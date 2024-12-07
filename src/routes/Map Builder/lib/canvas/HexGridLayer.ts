import SafeGraphicsContext from "./SafeGraphicsContext";
import HexDisplay from "./HexDisplay";
import type Viewport from "./Viewport";
import { Container } from "pixi.js";
import type { PointData } from "$lib/melvor/schema";

const SQRT_3 = Math.sqrt(3);
const THIRD_PI = Math.PI / 3;

class HexGridLayer extends Container<HexDisplay> {
  private readonly hexDisplayMap: Map<`${number}_${number}`, HexDisplay>;
  private hexesX: number;
  private hexesY: number;
  constructor() {
    super({
      label: "Hex Grid",
      zIndex: 1,
    });

    this.hexDisplayMap = new Map();
    this.hexesX = 0;
    this.hexesY = 0;
  }

  public static getHexVertices(hexScale: PointData): PointData[] {
    const hexVertices: PointData[] = [];
    for (let i = 0; i < 6; i++) {
      const theta = i * THIRD_PI;

      const x = hexScale.x * Math.cos(theta);
      const y = hexScale.y * Math.sin(theta);

      hexVertices.push({ x, y });
    }

    return hexVertices;
  }

  public static getHexGraphicContext(
    hexVertices: PointData[],
    viewport: Viewport,
    mapDimensions: PointData
  ): SafeGraphicsContext {
    const strokeWidth =
      mapDimensions.y /
      viewport.screenHeight /
      (viewport.scale.y / viewport.baseScale);

    return new SafeGraphicsContext()
      .setStrokeStyle({
        width: strokeWidth,
        color: 0xffffff,
        alpha: 1,
        alignment: 0,
      })
      .setFillStyle({
        alpha: 0,
        color: 0xffffff,
      })
      .poly(hexVertices)
      .stroke()
      .fill();
  }

  public static getHexScale(
    mapDimensions: PointData,
    hexesX: number,
    hexesY: number
  ): PointData {
    return {
      x: mapDimensions.x / (0.5 + 1.5 * hexesX),
      y: mapDimensions.y / (hexesY * SQRT_3),
    };
  }

  public populate(
    mapDimensions: PointData,
    viewport: Viewport,
    hexesX: number,
    hexesY: number
  ): this {
    const hexScale = HexGridLayer.getHexScale(mapDimensions, hexesX, hexesY);
    const graphicsContext = HexGridLayer.getHexGraphicContext(
      HexGridLayer.getHexVertices(hexScale),
      viewport,
      mapDimensions
    );

    const xUpperBound = Math.max(this.hexesX, hexesX);
    const yUpperBound = Math.max(this.hexesY, hexesY);

    for (let x = 0; x < xUpperBound; x++) {
      for (let y = 0; y < yUpperBound; y++) {
        if (x % 2 === 1 && y == hexesY - 1) {
          continue;
        }

        const mapKey = `${x}_${y}` as const;
        const existingHexDisplay = this.hexDisplayMap.get(mapKey);

        if (existingHexDisplay !== undefined) {
          if (x + 1 > hexesX || y + 1 > hexesY) {
            this.removeChild(existingHexDisplay).destroy(true);
            this.hexDisplayMap.delete(mapKey);

            continue;
          }

          existingHexDisplay.context = graphicsContext;
          existingHexDisplay.hexScale = hexScale;
          existingHexDisplay.coordinates = { x, y };

          continue;
        }

        const hexDisplay = new HexDisplay(graphicsContext, hexScale, {
          x,
          y,
        });

        this.hexDisplayMap.set(mapKey, hexDisplay);
        this.addChild(hexDisplay);
      }
    }

    this.hexesX = hexesX;
    this.hexesY = hexesY;

    return this;
  }

  public updateGraphicsContext(context: SafeGraphicsContext): this {
    this.children[0].context?.destroy(true);

    for (let i = 0, hexDisplays = this.children.length; i < hexDisplays; i++) {
      this.children[i].context = context;
    }

    return this;
  }
}

export default HexGridLayer;
