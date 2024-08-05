<script lang="ts">
  import { base } from "$app/paths";
  import { Sprite } from "pixi.js";
  import { fromBasis } from "$lib/functions/imageUtils";
  import type { PointData } from "$lib/melvor/schema";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Toolbar from "$lib/components/Toolbar/Toolbar.svelte";
  import ToolbarItem from "$lib/components/Toolbar/ToolbarItem.svelte";
  import DragDropUpload from "$lib/components/File Upload/DragDropUpload.svelte";
  import store from "./lib/store/store";
  import ProgressBar from "$lib/components/Progress Bar/ProgressBar.svelte";

  let dialog: Dialog;
  let errorContent: string = "";
  let transcodingProgress: number = 0;
  let progressBar: ProgressBar;

  const VALID_FILENAME_REGEX = /^tile_\d+_\d+@(1|0.5)x\.basis$/;
  async function onFileUpload(files: File[]): Promise<void> {
    if ($store.viewport === null) {
      errorContent = "Error: App is not initialised. This shouldn't happen...";
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

      errorContent = `Some tiles are missing. First, do you intend to have ${tilesX}x${tilesY} tiles? If so, then you are missing these tiles: ${missingTiles.map((tile) => JSON.stringify(tile)).join(", ")}`;
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
        progressBar.set(progress);
      }
    );

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      throw new Error(
        "[Map Builder +layout.svelte onFileUpload] | Could not get 2d canvas rendering context"
      );
    }

    canvas.width = transcodedFiles.tileWidth * tilesX;
    canvas.height = transcodedFiles.tileHeight * tilesY;

    for (const tile of transcodedFiles.tiles) {
      ctx.drawImage(
        tile.image,
        tile.x * transcodedFiles.tileWidth,
        tile.y * transcodedFiles.tileHeight,
        transcodedFiles.tileWidth,
        transcodedFiles.tileHeight
      );
    }

    const sprite = Sprite.from(canvas);

    $store.viewport.children[0]
      .removeChildren()
      .forEach((child) => child.destroy(true));

    $store.viewport.children[0].addChild(sprite);
    $store.viewport.worldWidth = tilesX * transcodedFiles.tileWidth;
    $store.viewport.worldHeight = tilesY * transcodedFiles.tileHeight;
    $store.viewport.centerViewport();
  }
</script>

<div class="container">
  <Toolbar>
    <ToolbarItem
      imageSRC="{base}/upload.png"
      imageAltText="An upload icon"
      imageOnClick={dialog?.toggle}
    >
      Upload Map Images
    </ToolbarItem>
  </Toolbar>

  <Dialog bind:this={dialog}>
    <div class="dialog">
      <h1>Upload Map Images</h1>
      <p>
        The map images must be in the format: tile_(x)_(y)@(1x OR 0.5x).basis
      </p>
      <p>ie, tile_3_5@0.5x.basis</p>

      <DragDropUpload mimeType=".basis" multiple={true} {onFileUpload}>
        <p>
          Drag and drop your .basis files here (in 1 go), or click to upload a
          file.
        </p>
        <span class="error">{errorContent}</span>
      </DragDropUpload>

      <div class="progress-bar" class:hidden={transcodingProgress === 0}>
        <ProgressBar
          bind:value={transcodingProgress}
          bind:this={progressBar}
          containerStyles={{
            "border-color": "red",
          }}
        />
      </div>
    </div>
  </Dialog>

  <div class="main">
    <slot />
  </div>
</div>

<style lang="scss">
  @import "/src/styles/globals.scss";

  * {
    color: white;
  }

  .container {
    margin-left: $toolbar-width;
    margin-right: 0;
    position: relative;
    min-height: calc(100vh - $navigation-bar-height - 1ch);
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

  .hidden {
    display: none;
  }
</style>
