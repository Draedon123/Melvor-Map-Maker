import type { PointData } from "pixi.js";
import type { HexCoordData } from "$lib/melvor/schema";

function oddQToAxial(coordinate: PointData): HexCoordData;
function oddQToAxial(x: number, y: number): HexCoordData;
function oddQToAxial(
  coordinates: PointData | number,
  y?: number
): HexCoordData {
  const column = typeof coordinates === "number" ? coordinates : coordinates.x;
  const row = typeof coordinates === "number" ? (y as number) : coordinates.y;
  const q = column;
  const r = row - (column - (column & 1)) / 2;

  return { q, r };
}

function axialToOddQ(coordinate: HexCoordData): PointData;
function axialToOddQ(q: number, r: number): PointData;
function axialToOddQ(
  coordinates: HexCoordData | number,
  r?: number
): PointData {
  const qCoordinate =
    typeof coordinates === "number" ? coordinates : coordinates.q;
  const rCoordinate =
    typeof coordinates === "number" ? (r as number) : coordinates.r;
  const x = qCoordinate;
  const y = rCoordinate + (qCoordinate - (qCoordinate & 1)) / 2;

  return { x, y };
}

export { oddQToAxial, axialToOddQ };
