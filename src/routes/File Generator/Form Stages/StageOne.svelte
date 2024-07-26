<script lang="ts">
  import FormStage from "../FormStage.svelte";
  import { error } from "$lib/functions/log";
  import store from "../store";
  import resizeImage from "$lib/functions/imageResize";

  export let activeStage: number;
  export let canGoToNextStage: boolean | string;
  export let disableAdvanceStageButtons: boolean;
  export function isStageComplete(): true | string {
    if (mapImage === null) {
      return "No uploaded image";
    }

    return true;
  }

  const LOG_PREFIX = "StageOne";

  let fileUpload: HTMLButtonElement;
  let fileUploadInput: HTMLInputElement;
  let isDragging: boolean = false;
  let mapImage: HTMLImageElement | null = null;

  function onFileDrop(event: DragEvent): void {
    const PREFIX = `${LOG_PREFIX} | onFileDrop`;
    if (event.dataTransfer === null) {
      return error(
        `${PREFIX}`,
        'Property "dataTransfer" was not found on event'
      );
    }

    isDragging = false;
    const item = event.dataTransfer.items[0];
    const file = item.getAsFile();

    if (file === null) {
      error(`${PREFIX}`, "Uploaded file is not an image");
      return;
    }

    uploadMapImage(file);
  }

  function onFileDragOver(event: DragEvent): void {
    const PREFIX = `${LOG_PREFIX} | onFileDragOver`;
    if (event.dataTransfer === null) {
      return error(
        `${PREFIX}`,
        'Property "dataTransfer" was not found on event'
      );
    }

    isDragging = true;
    const isDragValid = isDragEventValid(event);

    event.dataTransfer.dropEffect = isDragValid ? "link" : "none";
  }

  function onFileDragEnd(): void {
    isDragging = false;
  }

  function onFileUploadClick(): void {
    if (activeStage === 1) {
      fileUploadInput.click();
    }
  }

  function fileUploadOnChange(): void {
    const PREFIX = `${LOG_PREFIX} | fileUploadOnChange`;
    const fileList = fileUploadInput.files;
    if (fileList === null) {
      return error(PREFIX, "File Upload input does not have type=file");
    }

    const file = fileList.item(0);
    if (file === null) {
      error(`${PREFIX}`, "Uploaded file is not an image");
      return;
    }

    uploadMapImage(file);
  }

  function uploadMapImage(file: File): void {
    const blob = new Blob([file]);
    const blobURL = URL.createObjectURL(blob);
    disableAdvanceStageButtons = true;

    const image = new Image();

    image.onload = () => {
      const deltaWidth = image.width % 8;
      const deltaHeight = image.height % 8;

      resizeImage(
        image,
        {
          type: "additive",
          x: deltaWidth,
          y: deltaHeight,
        },
        "image"
      )
        .then((image) => {
          mapImage = image;
          if ($store.mapImage !== null) {
            URL.revokeObjectURL($store.mapImage.src);
          }
          $store.mapImage = image;
          disableAdvanceStageButtons = false;
          canGoToNextStage = isStageComplete();
        })
        .catch((error) => {
          disableAdvanceStageButtons = false;
          const errorMessage =
            error instanceof Error ? error.message : "Unspecified error";
          return error(`${LOG_PREFIX} | uploadMapImage`, errorMessage);
        });
    };

    image.src = blobURL;
  }

  const IS_IMAGE_REGEX = /^image\/png$/;
  function isDragEventValid(event: DragEvent): boolean {
    if (!IS_IMAGE_REGEX.test(event.dataTransfer?.items[0].type ?? "")) {
      return false;
    }

    return true;
  }
</script>

<FormStage stage={1} currentStage={activeStage}>
  <h1>Step 1: Insert Your Map Image</h1>
  <button
    class="file-upload"
    class:file-upload-dragging={isDragging}
    on:dragover|preventDefault={onFileDragOver}
    on:dragleave={onFileDragEnd}
    on:drop|preventDefault={onFileDrop}
    on:click={onFileUploadClick}
    bind:this={fileUpload}
  >
    <p>Drag and drop a .png image here, or click to upload a file.</p>
    {#if $store.mapImage !== null}
      <p class="center">
        To preview your uploaded image, click the
        <img
          src="/preview.png"
          alt="A document and a magnifying glass"
          style="height: 2em; width: 2em; display: inline; margin-left: 0.7ch;"
        />
        icon on the left toolbar
      </p>
    {/if}
    <input
      class="file-upload-input"
      type="file"
      accept="image/png"
      on:change={fileUploadOnChange}
      bind:this={fileUploadInput}
    />
  </button>
</FormStage>

<style lang="scss">
  h1 {
    margin: 0 0 0.25em 0;
  }

  .file-upload {
    width: 100%;
    height: 50vh;
    border: 10px dashed #3333dd;
    border-radius: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: large;
    background-color: transparent;
    color: #000000;
  }

  .file-upload-dragging {
    background-color: #cccccc;
  }

  .file-upload-input {
    display: none;
  }

  .center {
    display: flex;
    align-items: center;
  }
</style>
