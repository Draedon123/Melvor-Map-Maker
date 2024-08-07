import Dexie, { type EntityTable } from "dexie";
import { error } from "$lib/functions/log";
import { base } from "$app/paths";
import type { WorldMapData } from "$lib/melvor/schema";

type CachedFile = {
  key: string;
  file: Uint8Array;
};

type Project = { id: number } & Nullable<{
  name: string;
  namespace: string;
  tiles: Tiles;
  worldMapData: WorldMapData;
  modIcon: Uint8Array;
  thumbnail: Uint8Array;
}>;

type Tiles = {
  tilesX: number;
  tilesY: number;
  pngTiles: Uint8Array[];
  fullSizeBasisTiles: Uint8Array[];
  halfSizeBasisTiles: Uint8Array[];
};

const FILES_TO_CACHE: Record<string, string> = {
  "basis_encoder.wasm": "basis_encoder.wasm",
};

const LOG_PREFIX = "database";

class Database extends Dexie {
  cache!: EntityTable<CachedFile, "key">;
  projects!: EntityTable<Project, "id">;

  constructor(filesToCache: Record<string, string>) {
    super("melvormapmakerdb");

    this.version(1).stores({
      cache: "&key",
      projects: "++id",
    });

    const entries = Object.entries(filesToCache);
    for (const [key, url] of entries) {
      this.cache.get(key).then((result) => {
        if (result === undefined) {
          this.cacheFile(key, url);
        }
      });
    }
  }

  public async has(key: string): Promise<boolean> {
    return (await this.cache.get(key)) !== undefined;
  }

  public async cacheFile(key: string, fileURL: string): Promise<void> {
    try {
      const url = `${base}/${fileURL}`;
      const response = await fetch(url);
      if (!response.ok) {
        error(
          `${LOG_PREFIX} | cacheFile`,
          `Could not fetch file to cache.\nURL: ${url}.\nResponse Status: ${response.status}`
        );
        return;
      }
      const fileContents = new Uint8Array(await response.arrayBuffer());

      await this.cache.put({
        key,
        file: fileContents,
      });
    } catch (errorObject: unknown) {
      const errorMessage =
        typeof errorObject === "object" &&
        errorObject !== null &&
        "message" in errorObject
          ? errorObject.message
          : "Unspecified error";
      error(LOG_PREFIX, errorMessage);
    }
  }
}

const database = new Database(FILES_TO_CACHE);

export default database;
export type { CachedFile, Project, Tiles };
