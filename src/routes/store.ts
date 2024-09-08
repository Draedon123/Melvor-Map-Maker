import Project from "$lib/classes/Project";
import { writable } from "svelte/store";

type GlobalStore = {
  activeProject: Project;
};

const store = writable<GlobalStore>({
  activeProject: new Project(),
});

export default store;
export type { GlobalStore };
