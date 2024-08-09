import { fromArrayBuffer, toArrayBuffer } from "$lib/functions/imageUtils";
import type { WorldMapData } from "$lib/melvor/schema";
import type { Tiles, Project as DatabaseProject } from "$lib/database/database";
import database from "$lib/database/database";

type IProject = {
  id: number;
  name: string;
  namespace: string;
  tiles: Tiles;
  worldMapData: WorldMapData;
  modIcon: HTMLImageElement;
  thumbnail: HTMLImageElement;
};

class Project {
  public id: number | null;
  public name: string;
  public namespace: string | null;
  public tiles: Tiles | null;
  public worldMapData: WorldMapData | null;
  public modIcon: HTMLImageElement | null;
  public thumbnail: HTMLImageElement | null;
  constructor(project: Partial<Nullable<IProject>> = {}) {
    this.id = project.id ?? null;
    this.name = project.name ?? "Unnamed Project";
    this.namespace = project.namespace ?? null;
    this.tiles = project.tiles ?? null;
    this.worldMapData = project.worldMapData ?? null;
    this.modIcon = project.modIcon ?? null;
    this.thumbnail = project.thumbnail ?? null;
  }

  public static async new(): Promise<Project> {
    const project = new Project();
    await project.save();

    return project;
  }

  public static async fromDatabaseProject(
    project: DatabaseProject
  ): Promise<Project> {
    const modIcon =
      project.modIcon === null
        ? null
        : await fromArrayBuffer(project.modIcon.buffer);
    const thumbnail =
      project.thumbnail === null
        ? null
        : await fromArrayBuffer(project.thumbnail.buffer);

    return new Project({
      ...project,
      modIcon,
      thumbnail,
    });
  }

  public async save(): Promise<this> {
    const modIcon =
      this.modIcon === null
        ? null
        : new Uint8Array(await toArrayBuffer(this.modIcon));
    const thumbnail =
      this.thumbnail === null
        ? null
        : new Uint8Array(await toArrayBuffer(this.thumbnail));

    const data: Omit<DatabaseProject, "id"> | DatabaseProject = {
      id: this.id ?? undefined,
      name: this.name,
      namespace: this.namespace,
      tiles: this.tiles,
      worldMapData: this.worldMapData,
      modIcon,
      thumbnail,
    };

    const id = await database.projects.put(data);

    if (this.id === null) {
      this.id = id;
    }

    return this;
  }
}

export default Project;
