<script lang="ts">
  import { downloadZip } from "client-zip";
  import store from "../store";
  import FormStage from "../FormStage.svelte";
  import splitImage from "$lib/functions/splitImage";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import resizeImage from "$lib/functions/imageResize";
  import imageToBlob from "$lib/functions/imageToBlob";
  import imageToBasis from "$lib/functions/imageToBasis";

  export let activeStage: number;

  let progressBar: ProgressBar;
  let progress: number = 0;
  let error: string = "";
  let status: string = "";
  let zipFileURL: string = "";

  $: progressPercent = `${(progress * 100).toFixed(2)}%`;

  const PROGRESS_BREAKPOINTS = {
    RESIZE: 0.05,
    SPLIT_FULL_SIZE: 0.075,
    SPLIT_HALF_SIZE: 0.1,
    CONVERT_FULL_SIZE: 0.65,
    CONVERT_HALF_SIZE: 0.95,
    ZIP: 1.0,
  } as const;

  async function convertButtonOnClick(): Promise<void> {
    error = "";
    status = "";
    progressBar.set(0);
    if ($store.mapImage === null) {
      error = "No map image has been uploaded";
      return;
    }

    status = "Resizing map image to half-size";
    const halfSizeMapImage = await resizeImage(
      $store.mapImage,
      {
        type: "scale",
        x: 0.5,
        y: 0.5,
      },
      "image"
    );

    progressBar.set(PROGRESS_BREAKPOINTS.RESIZE);

    status = `Splitting full size map into tiles (0 / ${$store.tilesX * $store.tilesY})`;
    const fullSizeTiles = await splitImage(
      $store.mapImage,
      $store.tilesX,
      $store.tilesY,
      (progress, convertedCount, totalImages) => {
        status = `Splitting full size map into tiles (${convertedCount} / ${totalImages})`;
        progressBar.set(
          progress *
            (PROGRESS_BREAKPOINTS.SPLIT_FULL_SIZE -
              PROGRESS_BREAKPOINTS.RESIZE) +
            PROGRESS_BREAKPOINTS.RESIZE
        );
      }
    );

    status = `Splitting half size map into tiles (0 / ${$store.tilesX * $store.tilesY})`;
    const halfSizeTiles = await splitImage(
      halfSizeMapImage,
      $store.tilesX,
      $store.tilesY,
      (progress, convertedCount, totalImages) => {
        status = `Splitting half size map into tiles (${convertedCount} / ${totalImages})`;
        progressBar.set(
          progress *
            (PROGRESS_BREAKPOINTS.SPLIT_HALF_SIZE -
              PROGRESS_BREAKPOINTS.SPLIT_FULL_SIZE) +
            PROGRESS_BREAKPOINTS.SPLIT_FULL_SIZE
        );
      }
    );

    status = `Converting full size tiles into .basis files (0 / ${fullSizeTiles.length})`;
    const fullSizeBasisFiles = await imageToBasis(
      fullSizeTiles.map((tile) => {
        const { x, y, image } = tile;
        return {
          name: `tile_${x}_${y}@1x.basis`,
          image,
        };
      }),
      2,
      (progress, convertedCount, totalFiles) => {
        status = `Converting full size tiles into .basis files (${convertedCount} / ${totalFiles})`;
        progressBar.set(
          progress *
            (PROGRESS_BREAKPOINTS.CONVERT_FULL_SIZE -
              PROGRESS_BREAKPOINTS.SPLIT_HALF_SIZE) +
            PROGRESS_BREAKPOINTS.SPLIT_HALF_SIZE
        );
      }
    );

    status = `Converting half size tiles into .basis files (0 / ${halfSizeTiles.length})`;
    const halfSizeBasisFiles = await imageToBasis(
      halfSizeTiles.map((tile) => {
        const { x, y, image } = tile;
        return {
          name: `tile_${x}_${y}@0.5x.basis`,
          image,
        };
      }),
      2,
      (progress, convertedCount, totalFiles) => {
        status = `Converting half size tiles into .basis files (${convertedCount} / ${totalFiles})`;
        progressBar.set(
          progress *
            (PROGRESS_BREAKPOINTS.CONVERT_HALF_SIZE -
              PROGRESS_BREAKPOINTS.CONVERT_FULL_SIZE) +
            PROGRESS_BREAKPOINTS.CONVERT_FULL_SIZE
        );
      }
    );

    const fullSizeBasisBlobs = fullSizeBasisFiles.map(
      (data) => new File([data.file], data.name)
    );
    const halfSizeBasisBlobs = halfSizeBasisFiles.map(
      (data) => new File([data.file], data.name)
    );
    const pngBlobs = (
      await Promise.all(
        fullSizeTiles.map(async ({ x, y, image }) => {
          return {
            file: await imageToBlob(image),
            name: `tile_${x}_${y}@1x.png`,
          };
        })
      )
    ).map((data) => new File([data.file], data.name));

    status = "Zipping files";
    const [fullSizeZipFile, halfSizeZipFile, pngZipFile] = await Promise.all([
      downloadZip(fullSizeBasisBlobs).blob(),
      downloadZip(halfSizeBasisBlobs).blob(),
      downloadZip(pngBlobs).blob(),
    ]);

    const zipFile = await downloadZip([
      {
        name: "1xBasis.zip",
        input: fullSizeZipFile,
      },
      {
        name: "0.5xBasis.zip",
        input: halfSizeZipFile,
      },
      {
        name: "PNGs.zip",
        input: pngZipFile,
      },
    ]).blob();

    zipFileURL = URL.createObjectURL(zipFile);

    status = "Done!";
    progressBar.set(PROGRESS_BREAKPOINTS.ZIP);
  }

  function downloadZipFile(): void {
    const anchor = document.createElement("a");
    anchor.href = zipFileURL;
    anchor.download = "bgTiles.zip";
    anchor.click();
  }
</script>

<FormStage currentStage={activeStage} stage={3}>
  <div class="container">
    <h1>Step 3: Convert and Download Files</h1>
    <p class="progress-bar-status">
      {progressPercent}
      <br />
      {status}
    </p>
    <div class="progress-bar">
      <ProgressBar
        bind:this={progressBar}
        bind:value={progress}
        ariaLabel="File Conversion Progress"
      />
    </div>
    <div>
      <button on:click={convertButtonOnClick}>Convert</button>
      <button on:click={downloadZipFile} disabled={zipFileURL === ""}
        >Download</button
      >
    </div>
    {#if error !== ""}
      <span class="error">{error}</span>
    {/if}
  </div>
</FormStage>

<style lang="scss">
  @import "/src/styles/button.scss";

  h1 {
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4em;
  }

  p {
    margin: 0;
  }

  .progress-bar {
    height: 2em;
    width: 100%;
  }

  .progress-bar-status {
    text-align: center;
  }

  .error {
    font-size: larger;
    color: red;
  }
</style>
