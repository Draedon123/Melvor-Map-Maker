<svelte:options accessors />

<script lang="ts">
  import { base } from "$app/paths";
  import Tab from "./Tab.svelte";

  export let hidden: boolean = false;

  let container: HTMLDivElement;
  let activeTab: number = 0;

  function tabIconOnClick(id: number): void {
    activeTab = id;
  }
</script>

<div bind:this={container} class="container" class:hidden>
  <Tab
    imageSRC="{base}/hex_grid.png"
    imageAltText=""
    {activeTab}
    iconOnClick={tabIconOnClick}>1</Tab
  >
  <Tab
    imageSRC="{base}/hex_grid.png"
    imageAltText=""
    {activeTab}
    iconOnClick={tabIconOnClick}>2</Tab
  >
  <Tab
    imageSRC="{base}/hex_grid.png"
    imageAltText=""
    {activeTab}
    iconOnClick={tabIconOnClick}>3</Tab
  >
</div>

<style lang="scss">
  .container {
    height: 100%;
    width: 25vw;

    padding: 0.5em 1ch;
    background-color: #1f1f1f;
    overflow-x: hidden;
    overflow-y: scroll;

    z-index: 10;
    float: right;
    position: relative;

    flex-grow: 0;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      background-color: #1f1f1f;
      border: 1px solid black;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #3f3f3f;

      &:hover {
        background-color: #4f4f4f;
      }
    }
  }

  .hidden {
    display: none;
  }
</style>
