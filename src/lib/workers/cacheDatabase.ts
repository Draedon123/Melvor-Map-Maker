import Dexie, { type EntityTable } from "dexie";
import { error } from "$lib/functions/log";

type CachedFile = {
  key: string;
  file: Uint8Array;
};

const FILES_TO_CACHE: Record<string, string> = {
  "basis_encoder.wasm": "/basis_encoder.wasm",
};

const LOG_PREFIX = "cacheDatabase";

class FileCache extends Dexie {
  workerCachedFiles!: EntityTable<CachedFile, "key">;

  constructor(filesToCache: Record<string, string>) {
    super("cacheDB");

    this.version(1).stores({
      workerCachedFiles: "&key",
    });

    const entries = Object.entries(filesToCache);
    for (const [key, url] of entries) {
      this.workerCachedFiles.get(key).then((result) => {
        if (result === undefined) {
          this.cacheFile(key, url);
        }
      });
    }
  }

  public async has(key: string): Promise<boolean> {
    return (await this.workerCachedFiles.get(key)) !== undefined;
  }

  public async cacheFile(key: string, fileURL: string): Promise<void> {
    try {
      const response = await fetch(fileURL);
      const fileContents = new Uint8Array(await response.arrayBuffer());

      await this.workerCachedFiles.put({
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

const database = new FileCache(FILES_TO_CACHE);

export default database;
