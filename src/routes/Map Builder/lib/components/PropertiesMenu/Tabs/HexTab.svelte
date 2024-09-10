<script lang="ts">
  import { base } from "$app/paths";
  import { derived } from "svelte/store";
  import Tab from "../Tab.svelte";
  import store from "$routes/Map Builder/lib/store/store";
  import RequirementsTable from "$lib/components/Requirements/RequirementsTable.svelte";
  import CostsTable from "$lib/components/TableList/CostsTable.svelte";

  const data = derived(store, ($store) => $store.propertiesMenu.hexTab);

  let activeHex: StrictHexData | undefined = undefined;

  data.subscribe(() => {
    activeHex = $store.hexGridLayer.children.find(
      (hex) =>
        hex.coordinates.x === $data.activeHex.x &&
        hex.coordinates.y === $data.activeHex.y
    )?.hex;
  });
</script>

<Tab imageSRC="{base}/hex_grid.png" imageAltText="A hex grid">
  {#if activeHex !== undefined}
    <h3>
      Editing Hex: ({$data.activeHex.x}, {$data.activeHex.y})
    </h3>

    <label for="maxSurveyLevel"> Max Survey Level: </label>
    <input
      type="number"
      id="maxSurveyLevel"
      min="1"
      step="1"
      bind:value={activeHex.maxSurveyLevel}
      max={activeHex.maxMasteryLevel}
    />

    <br />

    <label for="maxMasteryLevel"> Max Mastery Level: </label>
    <input
      type="number"
      id="maxMasteryLevel"
      min={activeHex.maxSurveyLevel}
      step="1"
      bind:value={activeHex.maxMasteryLevel}
    />

    <br />

    <div class="center">
      <label for="isWater">Is water?</label>
      <input type="checkbox" id="isWater" bind:checked={activeHex.isWater} />
    </div>

    <h4>Requirements:</h4>
    <RequirementsTable bind:requirements={activeHex.requirements} />

    <h4>Travel Costs</h4>
    <CostsTable bind:costs={activeHex.travelCost} />
  {:else}
    <h3>No hex selected!</h3>
  {/if}

  <br />
  <br />
</Tab>

<style lang="scss">
  @import "/src/styles/input.scss";

  h3,
  h4 {
    margin: 0;
  }

  label {
    font-family: monospace;
    font-size: larger;
  }

  input[type="number"] {
    width: 10ch !important;
    font-size: medium;
    margin: 2px 0;

    @include input();
  }

  input[type="checkbox"] {
    appearance: none;

    width: 4em;
    height: 2em;

    font-size: medium;
    position: relative;

    background-color: #1f1f1f;
    border: 2px solid #3f3f3f;
    border-radius: 100em;

    cursor: pointer;

    &:checked {
      &::before {
        translate: calc(100% + 4px);
      }

      &::after {
        content: "";

        height: 40%;
        aspect-ratio: 0.5;

        rotate: 45deg;

        border-bottom: 2px solid #6f6f6f;
        border-right: 2px solid #6f6f6f;

        left: 0;
        translate: 0.5em;
        margin-top: 10%;
      }
    }

    &::before {
      content: "";
      height: 100%;
      aspect-ratio: 1;

      border-radius: 100em;
      background-color: white;

      position: absolute;
      top: 0;
      left: 0;

      z-index: 1;

      transition: translate 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    &::after {
      content: "\d7";
      color: #6f6f6f;
      font-size: calc(2em - 8px);

      position: absolute;
      right: 0;
      top: 0;

      translate: -0.25em;
    }
  }

  .center {
    display: flex;
    align-items: center;
  }
</style>
