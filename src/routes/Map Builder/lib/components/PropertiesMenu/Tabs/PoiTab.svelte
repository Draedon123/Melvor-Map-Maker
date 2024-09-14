<script lang="ts">
  import { base } from "$app/paths";
  import Tab from "../Tab.svelte";
  import TableList from "$lib/components/TableList/TableList.svelte";
  import globalStore from "$routes/store";
  import mapBuilderStore from "$routes/Map Builder/lib/store/store";
  import { onMount } from "svelte";
  import Dropdown from "$lib/components/Dropdown/Dropdown.svelte";
  import DropdownOption from "$lib/components/Dropdown/DropdownOption.svelte";

  $: activePOI = $mapBuilderStore.propertiesMenu.poiTab.activePOI;

  function newPOIButtonOnClick(): void {
    const id = Math.random().toFixed(6).slice(2);
    $globalStore.activeProject.worldMapData.pointsOfInterest.push({
      id: `placeholder_${id}`,
      type: "Other",
      coords: { x: 0, y: 0 },
      name: "placeholder",
      description: "placeholder",
      media: "assets/placeholder.png",
      activeStats: {},
      fastTravel: {
        groupID: "placeholder",
        unlockCosts: {
          currencies: [],
          items: [],
        },
      },
      discoveryModifiers: {
        moves: 1,
        modifiers: {},
      },
      discoveryRewards: {
        currencies: [],
        items: [],
      },
      hidden: {
        requirements: [],
        itemsWorn: [],
        showMarker: false,
      },
    });

    $globalStore.activeProject.worldMapData.pointsOfInterest =
      $globalStore.activeProject.worldMapData.pointsOfInterest;
  }

  function selectPOI(_poi: object): void {
    const selectedPOI = _poi as StrictPointOfInterestData;
    $mapBuilderStore.propertiesMenu.poiTab.activePOI = selectedPOI;
  }

  function onPOIDelete(poi: object): void {
    if (activePOI === poi) {
      activePOI = null;
    }
  }

  function updatePOIs(): void {
    $globalStore.activeProject.worldMapData.pointsOfInterest =
      $globalStore.activeProject.worldMapData.pointsOfInterest;
  }

  onMount(() => {
    const ticker = setInterval(() => {
      console.log($globalStore.activeProject.worldMapData.pointsOfInterest);
    }, 1000);

    return () => {
      clearInterval(ticker);
    };
  });
</script>

<Tab imageSRC="{base}/point_of_interest.png" imageAltText="A yellow flag">
  <h1>Points of Interest</h1>

  <button on:click={newPOIButtonOnClick}>Create new POI</button>

  <TableList
    headers={["Local ID"]}
    keys={["id"]}
    itemOnDelete={onPOIDelete}
    actions={[
      {
        iconSRC: `${base}/edit.png`,
        iconAltText: "A pen",
        onClick: selectPOI,
      },
    ]}
    bind:values={$globalStore.activeProject.worldMapData.pointsOfInterest}
  />

  {#if activePOI !== null}
    <h2>{activePOI.name}</h2>

    <label for="poiName"> Name: </label>
    <input id="poiName" name="poiName" bind:value={activePOI.name} />

    <br />

    <label for="poiID"> Local ID: </label>
    <input
      id="poiID"
      name="poiID"
      bind:value={activePOI.id}
      on:change={updatePOIs}
    />

    <br />

    <p>Coordinates:</p>
    <label for="poiX" class="monospace"> X: </label>
    <input
      id="poiX"
      name="poiX"
      type="number"
      bind:value={activePOI.coords.x}
    />

    <br />

    <label for="poiY" class="monospace"> Y: </label>
    <input
      id="poiY"
      name="poiY"
      type="number"
      bind:value={activePOI.coords.y}
    />

    <br />
    <p>Type:</p>
    <Dropdown bind:value={activePOI.type}>
      <DropdownOption value="Other">Standard</DropdownOption>
      <DropdownOption value="DigSite">Dig Site</DropdownOption>
      <DropdownOption value="Watchtower">Watchtower</DropdownOption>
    </Dropdown>

    <br />

    <label for="poiMedia">Media: </label>
    <input id="poiMedia" name="poiMedia" bind:value={activePOI.media} />
  {/if}
</Tab>

<style lang="scss">
  @import "/src/styles/button.scss";

  h1,
  h2 {
    margin: 0;
  }

  h1 {
    font-size: xx-large;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: x-large;
    margin-bottom: 1em;
  }

  input[type="number"] {
    width: 10ch;
  }

  .monospace {
    font-family: monospace;
  }

  button {
    & {
      @include button(#659ca7);
    }

    & {
      width: 100%;
      font-size: medium;
      margin-bottom: 0.5em;
    }
  }
</style>
