<script lang="ts">
  import FormStage from "../FormStage.svelte";
  import store from "../store";

  export let activeStage: number;

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

  $: tilesX = (() => {
    const tilesX = ($store.mapImage?.width ?? 0) / tileWidth;
    if (Number.isInteger(tilesX)) {
      $store.tilesX = tilesX;
    }

    return tilesX;
  })();
  $: tilesY = (() => {
    const tilesY = ($store.mapImage?.height ?? 0) / tileHeight;
    if (Number.isInteger(tilesY)) {
      $store.tilesY = tilesY;
    }

    return tilesY;
  })();

  $: isTilesXValid = Number.isInteger(tilesX);
  $: isTilesYValid = Number.isInteger(tilesY);

  store.subscribe((store) => {
    tileWidth =
      store.mapImage === null ? 1 : getTileDimensions(store.mapImage.width);
    tileHeight =
      store.mapImage === null ? 1 : getTileDimensions(store.mapImage.height);
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
        class:invalid={!isTilesXValid}
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
        class:invalid={!isTilesYValid}
        bind:value={tileHeight}
      />
    </label>

    <span class="error">
      {#if !isTilesXValid}
        Tile Width does not produce an integer number of tiles
        <br />
      {/if}
      {#if !isTilesYValid}
        Tile Height does not produce an integer number of tiles
      {/if}
    </span>
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

  .error {
    color: #ff0000;
    font-size: larger;
    width: 100%;
    text-align: center;
    display: block;
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
