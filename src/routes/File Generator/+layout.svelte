<script lang="ts" module>
  const PLACEHOLDER_PREVIEW_IMAGE_SRC = `${base}/black.png`;
</script>

<script lang="ts">
  import store from "./store";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Toolbar from "$lib/components/Toolbar/Toolbar.svelte";
  import ToolbarItem from "$lib/components/Toolbar/ToolbarItem.svelte";
  import { base } from "$app/paths";
  import { toBlob } from "$lib/functions/imageUtils";

  type Props = {
    children?: import("svelte").Snippet;
  };

  let { children }: Props = $props();

  let dialog: Dialog | undefined = $state();
  let lastMapImage: HTMLImageElement | null = null;
  let isFetchingPreviewImageSRC: boolean = false;
  let preview: HTMLImageElement | undefined = $state();
  let previewImageSRC: string = $state(PLACEHOLDER_PREVIEW_IMAGE_SRC);

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

  store.subscribe(($store) => {
    if ($store.mapImage === lastMapImage || isFetchingPreviewImageSRC) {
      return;
    }

    isFetchingPreviewImageSRC = true;
    getPreviewImageSrc($store.mapImage).then(() => {
      lastMapImage = $store.mapImage;
      isFetchingPreviewImageSRC = false;
    });
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
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  @use "sass:math";
  @use "/src/styles/globals.scss";

  img.preview {
    max-width: 80vh;
    max-height: 80vh;
    background-color: black;
    margin: 0;
  }

  .container {
    margin-left: calc(globals.$toolbar-width + 1ch);
    margin-right: 0;
    position: relative;
    max-width: calc(100vw - globals.$toolbar-width - 2ch);
    max-height: calc(100vh - globals.$navigation-bar-height - 1ch);
  }
</style>
