<svelte:options accessors />

<script lang="ts" context="module">
  import { writable, type Writable } from "svelte/store";

  type PropertiesMenuContext = {
    activeTab: Writable<number>;
  };

  const DEFAULT_CONTEXT: PropertiesMenuContext = {
    activeTab: writable(0),
  };

  export type { PropertiesMenuContext };
</script>

<script lang="ts">
  import { base } from "$app/paths";
  import { setContext } from "svelte";
  import Tab from "./Tab.svelte";

  export let hidden: boolean = false;

  let container: HTMLDivElement;

  setContext<PropertiesMenuContext>("propertiesMenu", DEFAULT_CONTEXT);
</script>

<div bind:this={container} class="container" class:hidden>
  <Tab imageSRC="{base}/hex_grid.png" imageAltText="">1</Tab>
  <Tab imageSRC="{base}/hex_grid.png" imageAltText="">2</Tab>
  <Tab imageSRC="{base}/hex_grid.png" imageAltText="">3</Tab>
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
