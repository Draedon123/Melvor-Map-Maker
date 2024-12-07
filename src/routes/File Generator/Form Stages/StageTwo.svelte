<script lang="ts">
  import store from "../store";
  import FormStage from "../FormStage.svelte";

  type Props = {
    activeStage: number;
  };

  let { activeStage }: Props = $props();
  let oldMapImage: HTMLImageElement | null = null;

  export function isStageComplete(): true | string {
    return getErrorMessage($store.mapImage, tileWidth, tileHeight);
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

  let tileWidth = $state(1);
  let tileHeight = $state(1);

  store.subscribe(($store) => {
    if (oldMapImage === $store.mapImage) {
      return;
    }

    oldMapImage = $store.mapImage;
    tileWidth =
      $store.mapImage === null ? 1 : getTileDimensions($store.mapImage.width);
    tileHeight =
      $store.mapImage === null ? 1 : getTileDimensions($store.mapImage.height);

    const tilesX = ($store.mapImage?.width ?? 0) / tileWidth;
    const tilesY = ($store.mapImage?.height ?? 0) / tileHeight;

    if ($store.tilesX === tilesX && $store.tilesY === tilesY) {
      return;
    }

    if (Number.isInteger(tilesX)) {
      $store.tilesX = tilesX;
    }

    if (Number.isInteger(tilesY)) {
      $store.tilesY = tilesY;
    }
  });

  let errorMessage = $derived(
    (() => {
      const message = getErrorMessage($store.mapImage, tileWidth, tileHeight);
      return message;
    })()
  );
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
  @use "/src/styles/input.scss";

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
    @include input.input;

    & {
      margin: 0.25em 0 0.25em 1ch;

      height: 2em;
      width: 10ch;
    }
  }
</style>
