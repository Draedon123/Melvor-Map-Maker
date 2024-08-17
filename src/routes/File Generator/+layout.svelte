<script lang="ts">
  import { base } from "$app/paths";
  import { resize } from "$lib/functions/imageUtils";
  import store from "./store";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Toolbar from "$lib/components/Toolbar/Toolbar.svelte";
  import ToolbarItem from "$lib/components/Toolbar/ToolbarItem.svelte";

  let dialog: Dialog;
  let preview: HTMLImageElement;
  let previewImageSRC: string = `${base}/black.png`;

  async function getPreviewImageSrc(
    image: HTMLImageElement | null
  ): Promise<void> {
    URL.revokeObjectURL(previewImageSRC);
    if (image === null) {
      previewImageSRC = `${base}/black.png`;
      return;
    }

    const width = document.body.offsetHeight * 0.75 * devicePixelRatio;
    const height = document.body.offsetHeight * 0.75 * devicePixelRatio;

    const src = await resize(
      image,
      {
        type: "to",
        x: width,
        y: height,
      },
      "url"
    );

    previewImageSRC = src;
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
    width: 75vh;
    height: 75vh;
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
