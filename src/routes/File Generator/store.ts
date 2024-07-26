import { derived, writable } from "svelte/store";

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

const mapImage = derived(store, ($store) => $store.mapImage);

const tileDimensions = derived(store, ($store) => {
  return {
    tilesX: $store.tilesX,
    tilesY: $store.tilesY,
  };
});

export default store;
export { mapImage, tileDimensions };
export type { FileGeneratorStore };
