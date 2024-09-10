<script lang="ts" context="module">
  const PLACEHOLDER_PREVIEW_IMAGE_SRC = `${base}/black.png`;
</script>

<script lang="ts">
  import { base } from "$app/paths";
  import { toBlob } from "$lib/functions/imageUtils";
  import store from "./store";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Toolbar from "$lib/components/Toolbar/Toolbar.svelte";
  import ToolbarItem from "$lib/components/Toolbar/ToolbarItem.svelte";

  let dialog: Dialog;
  let preview: HTMLImageElement;
  let previewImageSRC: string = PLACEHOLDER_PREVIEW_IMAGE_SRC;

  async function getPreviewImageSrc(
    image: HTMLImageElement | null
  ): Promise<void> {
    URL.revokeObjectURL(previewImageSRC);
    if (image === null) {
      previewImageSRC = PLACEHOLDER_PREVIEW_IMAGE_SRC;
      return;
    }

    previewImageSRC = URL.createObjectURL(await toBlob(image));
  }

  store.subscribe((store) => {
    getPreviewImageSrc(store.mapImage);
  });
</script>

<div class="container">
  <Toolbar>
    <ToolbarItem
      imageSRC="{base}/preview.png"
      imageAltText="A document and a magnifying glass"
      onClick={dialog?.toggle}
    >
      Preview Image
    </ToolbarItem>
  </Toolbar>

  <Dialog bind:this={dialog}>
    <img
      bind:this={preview}
      src={previewImageSRC}
      alt="Preview"
      class="preview"
      style={previewImageSRC === PLACEHOLDER_PREVIEW_IMAGE_SRC
        ? "width: 80vh; height: 80vh;"
        : ""}
    />
  </Dialog>

  <div class="main">
    <slot />
  </div>
</div>

<style lang="scss">
  @use "sass:math";
  @import "/src/styles/globals.scss";

  img.preview {
    max-width: 80vh;
    max-height: 80vh;
    background-color: black;
    margin: 0;
  }

  .container {
    margin-left: calc($toolbar-width + 1ch);
    margin-right: 0;
    position: relative;
    max-width: calc(100vw - $toolbar-width - 2ch);
    max-height: calc(100vh - $navigation-bar-height - 1ch);
  }
</style>
