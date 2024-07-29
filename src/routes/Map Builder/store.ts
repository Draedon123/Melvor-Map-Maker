import { Application } from "pixi.js";
import { writable } from "svelte/store";

type MapBuilderStore = {
  app: Application | null;
};

const store = writable<MapBuilderStore>({
  app: null,
});

export default store;
export type { MapBuilderStore };
