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

    <label for="isWater">Is water?</label>
    <input type="checkbox" id="isWater" bind:checked={activeHex.isWater} />

    <h4>Requirements:</h4>
    <RequirementsTable bind:requirements={activeHex.requirements} />

    <h4>Travel Costs</h4>
    <CostsTable bind:costs={activeHex.travelCost} />
  {:else}
    <h3>No hex selected!</h3>
  {/if}
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
</style>
