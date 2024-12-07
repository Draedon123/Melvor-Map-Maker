<script lang="ts">
  import { error } from "$lib/functions/log";

  type Props = {
    mimeType?: string;
    validFileRegex?: RegExp;
    multiple?: boolean;
    onFileUpload?: (files: File[]) => void;
    children?: import("svelte").Snippet;
  };

  let {
    mimeType = "*",
    validFileRegex = /.*/,
    multiple = false,
    onFileUpload = () => {},
    children,
  }: Props = $props();

  const LOG_PREFIX = "DragDropUpload.svelte";
  let isDragging: boolean = $state(false);
  let fileUploadInput: HTMLInputElement | undefined = $state();

  function onFileDrop(event: DragEvent): void {
    const PREFIX = `${LOG_PREFIX} | onFileDrop`;

    event.preventDefault();

    if (event.dataTransfer === null) {
      return error(
        `${PREFIX}`,
        'Property "dataTransfer" was not found on event'
      );
    }

    isDragging = false;
    const files = [...event.dataTransfer.items]
      .map((item) => item.getAsFile())
      .filter(
        (file) => file !== null && validFileRegex.test(file.name)
      ) as File[];

    if (files.length === 0) {
      return;
    }

    onFileUpload(files);
  }

  function onFileDragOver(event: DragEvent): void {
    const PREFIX = `${LOG_PREFIX} | onFileDragOver`;

    event.preventDefault();

    if (event.dataTransfer === null) {
      return error(
        `${PREFIX}`,
        'Property "dataTransfer" was not found on event'
      );
    }

    isDragging = true;

    event.dataTransfer.dropEffect = "link";
  }

  function onFileDragEnd(): void {
    isDragging = false;
  }

  function onFileUploadClick(): void {
    if (fileUploadInput === undefined) {
      return;
    }

    fileUploadInput.click();
  }

  function fileUploadOnChange(event: {
    currentTarget: HTMLInputElement;
  }): void {
    const files = event.currentTarget.files;
    onFileUpload(files ? [...files] : []);
  }
</script>

<button
  class="file-upload"
  class:file-upload-dragging={isDragging}
  ondragover={onFileDragOver}
  ondragleave={onFileDragEnd}
  ondrop={onFileDrop}
  onclick={onFileUploadClick}
>
  {#if children}{@render children()}{:else}
    <p>Drag and drop a files here, or click to upload a file.</p>
  {/if}
  <input
    class="file-upload-input"
    type="file"
    accept={mimeType}
    {multiple}
    onchange={fileUploadOnChange}
    bind:this={fileUploadInput}
  />
</button>

<style lang="scss">
  .file-upload {
    cursor: pointer;

    width: 100%;
    height: max-content;
    min-height: 10em;

    border: 10px dashed #3333dd;
    border-radius: 2em;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
</style>
