<script lang="ts">
  import store from "../store";
  import FormStage from "../FormStage.svelte";
  import DragDropUpload from "$lib/components/File Upload/DragDropUpload.svelte";
  import { base } from "$app/paths";
  import { resize } from "$lib/functions/imageUtils";

  type Props = {
    activeStage: number;
    canGoToNextStage: boolean | string;
    disableAdvanceStageButtons: boolean;
  };

  let {
    activeStage,
    canGoToNextStage = $bindable(),
    disableAdvanceStageButtons = $bindable(),
  }: Props = $props();

  export function isStageComplete(): true | string {
    if (mapImage === null) {
      return "No uploaded image";
    }

    return true;
  }

  const LOG_PREFIX = "StageOne";

  let mapImage: HTMLImageElement | null = null;

  function uploadMapImage(file: File): void {
    const blob = new Blob([file]);
    const blobURL = URL.createObjectURL(blob);
    disableAdvanceStageButtons = true;

    const image = new Image();

    image.onload = () => {
      const deltaWidth = image.width % 8;
      const deltaHeight = image.height % 8;

      resize(
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
        .catch((errorObject) => {
          disableAdvanceStageButtons = false;
          const errorMessage =
            errorObject instanceof Error
              ? errorObject.message
              : "Unspecified error";
          throw new Error(`[${LOG_PREFIX} | uploadMapImage] | ${errorMessage}`);
        });
    };

    image.src = blobURL;
  }
</script>

<FormStage stage={1} currentStage={activeStage}>
  <h1>Step 1: Insert Your Map Image</h1>
  <div class="file-upload-container">
    <DragDropUpload
      onFileUpload={(files) => {
        uploadMapImage(files[0]);
      }}
      validFileRegex={/.+\.png$/}
      mimeType="image/png"
    >
      <p>Drag and drop a .png image here, or click to upload a file.</p>
      {#if $store.mapImage !== null}
        <p>
          To preview your uploaded image, click the
          <img
            src="{base}/preview.png"
            alt="A document and a magnifying glass"
            style="height: 2em; width: 2em; display: inline; margin-left: 0.7ch; position: relative; top: 0.5em;"
          />
          icon on the left toolbar
        </p>
      {/if}
    </DragDropUpload>
  </div>
</FormStage>

<style lang="scss">
  h1 {
    margin: 0 0 0.25em 0;
  }

  .file-upload-container {
    width: 100%;
  }
</style>
