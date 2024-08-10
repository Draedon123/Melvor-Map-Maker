<script lang="ts">
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import store from "../../store/store";
  import { onMount } from "svelte";

  export const exports: { modal: Dialog | null } = {
    modal: null,
  };

  let modal: Dialog;

  const lastHexes = {
    x: $store.hexesX,
    y: $store.hexesY,
  };

  store.subscribe(({ hexesX, hexesY }) => {
    if (
      $store.viewport === null ||
      (lastHexes.x === hexesX && lastHexes.y === hexesY)
    ) {
      return;
    }

    $store.hexGridLayer.populate(
      $store.mapDimensions,
      $store.viewport,
      hexesX,
      hexesY
    );
  });

  onMount(() => {
    exports.modal = modal;
  });
</script>

<Dialog bind:this={modal}>
  <div class="dialog">
    <h1>Hex Count</h1>
    <br />
    <label for="hexesX"> X: </label>
    <input
      id="hexesX"
      name="hexesX"
      type="number"
      min={1}
      step={1}
      value={$store.hexesX}
      on:change={(event) => {
        const value = parseInt(event.currentTarget.value);
        $store.hexesX = isNaN(value) ? 1 : Math.max(Math.floor(value), 1);
      }}
    />

    <br />

    <label for="hexesY"> Y: </label>
    <input
      id="hexesY"
      name="hexesY"
      type="number"
      min={1}
      step={1}
      value={$store.hexesY}
      on:change={(event) => {
        const value = parseInt(event.currentTarget.value);
        $store.hexesY = isNaN(value) ? 1 : Math.max(Math.floor(value), 1);
      }}
    />
  </div>
</Dialog>

<style lang="scss">
  @import "/src/styles/input.scss";

  * {
    color: white;
  }

  h1 {
    margin: 0;
  }

  .dialog {
    input {
      @include input;

      & {
        width: 10ch;
        margin: 0.25em 0 0 0.3ch;
      }
    }
  }
</style>
