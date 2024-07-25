import { writable } from "svelte/store";

type FileGeneratorStore = {
  mapImage: HTMLImageElement | null;
  tilesX: number;
  tilesY: number;
};

const store = writable<FileGeneratorStore>({
  mapImage: null,
  tilesX: 0,
  tilesY: 0,
});

export default store;
export type { FileGeneratorStore };
