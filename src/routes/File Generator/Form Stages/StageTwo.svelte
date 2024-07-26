<script lang="ts">
  import FormStage from "../FormStage.svelte";
  import store, { mapImage } from "../store";

  export let activeStage: number;
  export let canGoToNextStage: true | string;
  export function isStageComplete(): true | string {
    return getErrorMessage($mapImage, tileWidth, tileHeight);
  }

  function getErrorMessage(
    mapImage: HTMLImageElement | null,
    tileWidth: number,
    tileHeight: number
  ): true | string {
    if (tileWidth < 1) {
      return "Tile width must be greater than 1";
    }

    if (tileHeight < 1) {
      return "Tile height must be greater than 1";
    }

    if (!Number.isInteger(tileWidth)) {
      console.log(tileWidth);
      return "Tile width must be an integer";
    }

    if (!Number.isInteger(tileHeight)) {
      return "Tile height must be an integer";
    }

    if (tileWidth > 2000) {
      return "Tile width must be less than 2000";
    }

    if (tileHeight > 2000) {
      return "Tile height must be less than 2000";
    }

    if (mapImage !== null) {
      if (!Number.isInteger(mapImage.width / tileWidth)) {
        return "Tile width does not produce an integer number of tiles";
      }

      if (!Number.isInteger(mapImage.height / tileHeight)) {
        return "Tile height does not produce an integer number of tiles";
      }
    }

    return true;
  }

  function getTileDimensions(imageLength: number): number {
    for (let tileCount = 1; tileCount++; tileCount < imageLength) {
      const tileDimension = imageLength / tileCount;
      if (Number.isInteger(tileDimension) && tileDimension < 2000) {
        return tileDimension;
      }
    }

    return 0;
  }

  let tileWidth = 1;
  let tileHeight = 1;

  $: {
    const tilesX = ($mapImage?.width ?? 0) / tileWidth;
    if (Number.isInteger(tilesX)) {
      $store.tilesX = tilesX;
    }
  }

  $: {
    const tilesY = ($mapImage?.height ?? 0) / tileHeight;
    if (Number.isInteger(tilesY)) {
      $store.tilesY = tilesY;
    }
  }

  $: errorMessage = (() => {
    const message = getErrorMessage($mapImage, tileWidth, tileHeight);
    canGoToNextStage = message;
    return message;
  })();

  let oldMapImage: HTMLImageElement | null = null;
  mapImage.subscribe((mapImage) => {
    if (oldMapImage === mapImage) {
      return;
    }
    oldMapImage = mapImage;
    tileWidth = mapImage === null ? 1 : getTileDimensions(mapImage.width);
    tileHeight = mapImage === null ? 1 : getTileDimensions(mapImage.height);
  });
</script>

<FormStage stage={2} currentStage={activeStage}>
  <div class="container">
    <h1>Step 2: (Optional)</h1>

    <label for="tileWidth">
      Tile Width:
      <input
        id="tileWidth"
        name="tileWidth"
        type="number"
        min="1"
        max="2000"
        step="1"
        class:invalid={typeof errorMessage === "string"}
        bind:value={tileWidth}
      />
    </label>

    <br />

    <label for="tileHeight">
      Tile Height:
      <input
        id="tileHeight"
        name="tileHeight"
        type="number"
        min="1"
        max="2000"
        step="1"
        class:invalid={typeof errorMessage === "string"}
        bind:value={tileHeight}
      />
    </label>
  </div>
</FormStage>

<style lang="scss">
  h1 {
    margin: 0;
  }

  .container {
    text-align: center;
  }

  label {
    display: inline-flex;
    align-items: center;
    width: max-content;
  }

  input.invalid {
    border-color: #ff0000 !important;
    outline-color: #ff0000 !important;
  }

  label > input {
    $background-colour: #1f1f1f;
    $border-colour: color-mix(in srgb, $background-colour 85%, #ffffff 15%);

    margin: 0.25em 0 0.25em 1ch;
    height: 2em;
    width: 10ch;

    font-size: large;
    text-indent: 0.5em;

    background-color: $background-colour;
    color: white;
    transition:
      background-color 0.3s,
      border-color 0.3s;

    border-radius: 100em;
    border: 3px solid $border-colour;

    outline-color: $border-colour;

    &:hover {
      background-color: color-mix(in srgb, $background-colour 85%, #ffffff 15%);
      border-color: color-mix(in srgb, $border-colour 85%, #ffffff 15%);
    }
  }
</style>
