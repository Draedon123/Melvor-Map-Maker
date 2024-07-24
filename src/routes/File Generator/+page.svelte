<script lang="ts">
  import clamp from "$lib/functions/clamp";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import HashManager from "$lib/classes/HashManager";
  import FormStage from "./FormStage.svelte";

  const enum FILE_UPLOAD_ERROR {
    "NO_ERROR" = -1,
    "INVALID_IMAGE",
    "TOO_MANY_FILES",
    "NOT_A_FILE",
  }

  const hashManager = HashManager.fromWindow();
  const STAGE_COMPLETION: Record<number, () => true | string> = {
    1: () => {
      if (mapImage === null) {
        return "No uploaded image";
      }

      return true;
    },
  };

  let form: HTMLFormElement;
  let activeStage: number = browser
    ? parseInt(hashManager.get("stage") ?? "1")
    : 1;
  let lastStage: number = 1;

  let fileUpload: HTMLButtonElement;
  let fileUploadInput: HTMLInputElement;
  let isDragging: boolean = false;
  let fileUploadError: FILE_UPLOAD_ERROR = FILE_UPLOAD_ERROR.NO_ERROR;
  let mapImage: HTMLImageElement | null = null;
  let canGoToNextStage = STAGE_COMPLETION[activeStage]?.() ?? true;

  function advanceStage(direction: "back" | "forward"): void {
    if (typeof canGoToNextStage === "string") {
      return;
    }

    activeStage = clamp(
      activeStage + (direction === "back" ? -1 : 1),
      1,
      lastStage
    );

    canGoToNextStage = STAGE_COMPLETION[activeStage]?.() ?? true;

    hashManager.set("stage", activeStage.toString());
    hashManager.updateWindowHash();
  }

  function onFileDrop(event: DragEvent) {
    isDragging = false;
    const item = event.dataTransfer!.items[0];
    const file = item.getAsFile();

    if (file === null) {
      fileUploadError = FILE_UPLOAD_ERROR.NOT_A_FILE;
      return;
    }

    uploadMapImage(file);
  }

  function onFileDragOver(event: DragEvent) {
    isDragging = true;
    const isDragValid = isDragEventValid(event);

    event.dataTransfer!.dropEffect = isDragValid ? "link" : "none";
  }

  function onFileDragEnd() {
    isDragging = false;
  }

  function onFileUploadClick() {
    fileUploadInput.click();
  }

  function fileUploadOnChange() {
    const fileList = fileUploadInput.files;
    if (fileList === null) {
      throw new Error(
        "[File Generator +page] | File Input is not of type File"
      );
    }

    const file = fileList.item(0);
    if (file === null) {
      fileUploadError = FILE_UPLOAD_ERROR.NOT_A_FILE;
      return;
    }

    uploadMapImage(file);
  }

  function uploadMapImage(file: File) {
    const blob = new Blob([file]);
    const blobURL = URL.createObjectURL(blob);

    const image = new Image();
    image.onload = () => {
      mapImage = image;
      canGoToNextStage = STAGE_COMPLETION[activeStage]?.() ?? true;
      URL.revokeObjectURL(blobURL);
      advanceStage("forward");
    };

    image.src = blobURL;
  }

  const IS_IMAGE_REGEX = /^image\/png$/;
  function isDragEventValid(event: DragEvent): FILE_UPLOAD_ERROR {
    if (!event.dataTransfer?.items[0].type.match(IS_IMAGE_REGEX)) {
      return FILE_UPLOAD_ERROR.INVALID_IMAGE;
    }

    if (event.dataTransfer?.files.length !== 1) {
      return FILE_UPLOAD_ERROR.TOO_MANY_FILES;
    }

    return FILE_UPLOAD_ERROR.NO_ERROR;
  }

  onMount(() => {
    const formStages = [...form.children].filter(
      (child) => child.getAttribute("data-form-stage") !== null
    );

    // last element is a container for submit buttons
    let lastIndex = formStages.length;
    lastStage = lastIndex;

    for (let i = 0; i < lastIndex; i++) {
      const child = formStages[i];
      child.setAttribute("data-stage", i.toString());
    }
  });
</script>

<svelte:head>
  <title>File Generator</title>
</svelte:head>

<div class="form-container">
  <form
    class="scrolling-form"
    name="fileGeneratorForm"
    id="fileGeneratorForm"
    bind:this={form}
  >
    <FormStage stage={1} currentStage={activeStage}>
      <h1>Step 1: Insert your map image</h1>
      <button
        class="file-upload"
        class:file-upload-dragging={isDragging}
        on:dragover|preventDefault={onFileDragOver}
        on:dragleave={onFileDragEnd}
        on:drop|preventDefault={onFileDrop}
        on:click={onFileUploadClick}
        bind:this={fileUpload}
      >
        Drag and drop a .png image here, or click to upload a file
        <input
          class="file-upload-input"
          type="file"
          accept="image/*"
          on:change={fileUploadOnChange}
          bind:this={fileUploadInput}
        />
      </button>
    </FormStage>
    <FormStage stage={2} currentStage={activeStage}>2</FormStage>
    <FormStage stage={3} currentStage={activeStage}>3</FormStage>
    <div class="submit">
      <div class="error">
        {#if typeof canGoToNextStage === "string"}
          {canGoToNextStage}
        {/if}
      </div>
      <div class="submit-button-container">
        <input
          type="submit"
          data-direction="back"
          value="Back"
          on:click|preventDefault={() => {
            advanceStage("back");
          }}
        />
        <input
          type="submit"
          data-direction="forward"
          value="Next"
          on:click|preventDefault={() => {
            advanceStage("forward");
          }}
        />
      </div>
    </div>
  </form>
</div>

<style lang="scss">
  .form-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: xx-large;
  }

  .submit {
    margin-top: 0.5em;
    text-align: center;
  }

  .submit-button-container {
    display: flex;
    justify-content: center;

    $input-background-colour: #3333dd;
    $input-border-colour: color-mix(
      in srgb,
      $input-background-colour 90%,
      #000000 10%
    );

    input {
      background-color: $input-background-colour;
      border: 2px solid;
      border-color: $input-border-colour;
      border-radius: 3em;

      width: 10ch;
      height: 3em;
      font-size: large;

      margin: 1ch;
      cursor: pointer;
      color: #ffffff;
      transition:
        background-color 0.3s,
        border-color 0.3s;
    }

    & :hover {
      background-color: color-mix(
        in srgb,
        $input-background-colour 85%,
        #000000 15%
      );
      border-color: color-mix(in srgb, $input-border-colour 85%, #000000 15%);
    }
  }

  .error {
    color: red;
  }

  h1 {
    margin: 0 0 0.25em 0;
  }

  .file-upload {
    width: 100%;
    height: 50vh;
    border: 10px dashed #3333dd;
    border-radius: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: large;
    background-color: #ffffff;
  }

  .file-upload-dragging {
    background-color: #cccccc;
  }

  .file-upload-input {
    display: none;
  }
</style>
