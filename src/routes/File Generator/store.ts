import { writable } from "svelte/store";

type FileGeneratorStore = {
  mapImage: HTMLImageElement | null;
};

const store = writable<FileGeneratorStore>({
  mapImage: null,
});

export default store;
export type { FileGeneratorStore };
