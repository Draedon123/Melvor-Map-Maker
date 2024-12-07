<script lang="ts">
  import store from "../../store/store";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import ProgressBar from "$lib/components/Progress Bar/ProgressBar.svelte";
  import DragDropUpload from "$lib/components/File Upload/DragDropUpload.svelte";
  import { Sprite } from "pixi.js";
  import { onMount } from "svelte";
  import { fromBasis, toCanvas } from "$lib/functions/imageUtils";
  import type { PointData } from "$lib/melvor/schema";

  export const exports: { modal: Dialog | null } = {
    modal: null,
  };

  let modal: Dialog | undefined = $state();
  let errorContent: string = $state("");
  let progressBar: ProgressBar | undefined = $state();

  const VALID_FILENAME_REGEX = /^tile_\d+_\d+@(1|0.5)x\.basis$/;

  async function onFileUpload(files: File[]): Promise<void> {
    errorContent = "";

    if ($store.viewport === null) {
      errorContent = "Error: App is not initialised. This shouldn't happen...";
      return;
    }

    if (files.length === 0) {
      return;
    }

    const invalidFileName = files.find(
      (file) => !VALID_FILENAME_REGEX.test(file.name)
    )?.name;
    if (invalidFileName !== undefined) {
      errorContent = `Invalid file name: ${invalidFileName}`;
      return;
    }

    const tiles = files.map((file) => {
      // tile_x_y@resolutionx.basis -> tile_x_y@resolutionx -> [tile, x, y, resolution]
      const splitTileName = file.name.slice(0, -"x.basis".length).split(/_|@/g);

      const x = parseInt(splitTileName[1]);
      const y = parseInt(splitTileName[2]);
      const resolution = parseInt(splitTileName[3]);

      return { x, y, resolution };
    });

    const tilesX = Math.max(...tiles.map((coordinate) => coordinate.x)) + 1;
    const tilesY = Math.max(...tiles.map((coordinate) => coordinate.y)) + 1;

    if (tiles.length !== tilesX * tilesY) {
      const missingTiles: PointData[] = [];

      for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
          if (
            tiles.find((tile) => tile.x === x && tile.y === y) === undefined
          ) {
            missingTiles.push({ x, y });
          }
        }
      }

      errorContent = `Some tiles are missing. First, do you intend to have ${tilesX}x${tilesY} tiles? If so, then you are missing these tiles: ${missingTiles.map((tile) => `(${tile.x},${tile.y})`).join(", ")}`;
      return;
    }

    const transcodedFiles = await fromBasis(
      files.map((file) => {
        return {
          file,
          name: file.name,
        };
      }),
      2,
      (progress) => {
        progressBar?.set(progress);
      }
    );

    $store.mapDimensions = {
      x: transcodedFiles.tileWidth * tilesX,
      y: transcodedFiles.tileHeight * tilesY,
    };

    const sprites = transcodedFiles.tiles.map((tile) => {
      const sprite = Sprite.from(toCanvas(tile.image));

      sprite.x = tile.x * transcodedFiles.tileWidth;
      sprite.y = tile.y * transcodedFiles.tileHeight;

      sprite.cullable = true;
      sprite.label = `Tile (${tile.x}, ${tile.y})`;

      return sprite;
    });

    $store.viewport.children.forEach((container) => {
      console.log(container, container.removeChildren);
      container.removeChildren().forEach((child) => child.destroy());
    });

    $store.backgroundLayer.addChild(...sprites);

    $store.viewport.worldWidth = $store.mapDimensions.x;
    $store.viewport.worldHeight = $store.mapDimensions.y;

    $store.viewport.centerViewport();

    $store.hexGridLayer.populate(
      $store.mapDimensions,
      $store.viewport,
      $store.hexesX,
      $store.hexesY
    );
  }

  onMount(() => {
    if (modal !== undefined) {
      exports.modal = modal;
    }
  });
</script>

<Dialog bind:this={modal}>
  <div class="dialog">
    <h1>Upload Map Images</h1>
    <p>The map images must be in the format: tile_(x)_(y)@(1x OR 0.5x).basis</p>
    <p>ie, tile_3_5@0.5x.basis</p>

    <DragDropUpload mimeType=".basis" multiple={true} {onFileUpload}>
      <p>
        Drag and drop your .basis files here (in 1 go), or click to upload a
        file.
      </p>
      <span class="error">{errorContent}</span>
    </DragDropUpload>

    <div class="progress-bar" class:hidden={(progressBar?.value ?? 0) === 0}>
      <ProgressBar
        bind:this={progressBar}
        containerStyles={{
          "border-color": "red",
        }}
      />
    </div>
  </div>
</Dialog>

<style lang="scss">
  * {
    color: white;
  }

  h1 {
    margin: 0;
  }

  .dialog {
    font-size: x-large;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .progress-bar {
    height: 2em;
    margin-top: 1em;
    width: 98%;
  }

  .error {
    font-size: x-large;
    color: red;
    overflow-wrap: break-word;
    width: 100%;
  }
</style>
