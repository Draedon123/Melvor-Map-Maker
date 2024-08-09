import type Project from "$lib/classes/Project";
import { writable } from "svelte/store";

type GlobalStore = {
  activeProject: Project | null;
};

const store = writable<GlobalStore>({
  activeProject: null,
});

export default store;
export type { GlobalStore };
