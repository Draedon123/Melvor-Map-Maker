import type { PointData } from "$lib/melvor/schema";
import { Container } from "pixi.js";
import SafeGraphicsContext from "./SafeGraphicsContext";
import type Viewport from "./Viewport";
import HexDisplay from "./HexDisplay";

const SQRT_3 = Math.sqrt(3);
const THIRD_PI = Math.PI / 3;

class HexGridLayer extends Container<HexDisplay> {
  constructor() {
    super({
      label: "Hex Grid",
      zIndex: 1,
      interactive: false,
      interactiveChildren: false,
    });
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
      .poly(hexVertices)
      .stroke();
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
  ): HexDisplay[] {
    const hexDisplays: HexDisplay[] = [];
    const hexScale = HexGridLayer.getHexScale(mapDimensions, hexesX, hexesY);
    const graphicsContext = HexGridLayer.getHexGraphicContext(
      HexGridLayer.getHexVertices(hexScale),
      viewport,
      mapDimensions
    );

    for (let x = 0; x < hexesX; x++) {
      for (let y = 0; y < hexesY; y++) {
        if (x % 2 === 1 && y == hexesY - 1) {
          continue;
        }

        const hexGraphic = new HexDisplay(graphicsContext, hexScale, { x, y });
        hexDisplays.push(hexGraphic);
      }
    }

    this.removeChildren().forEach((child) => {
      child.destroy(true);
    });
    this.addChild(...hexDisplays);

    return hexDisplays;
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
