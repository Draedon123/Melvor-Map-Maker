<script lang="ts">
  import Hex from "./lib/components/modals/Hex.svelte";
  import Toolbar from "$lib/components/Toolbar/Toolbar.svelte";
  import UploadFile from "./lib/components/modals/UploadFile.svelte";
  import ToolbarItem from "$lib/components/Toolbar/ToolbarItem.svelte";
  import PropertiesMenu from "./lib/components/PropertiesMenu/PropertiesMenu.svelte";
  import { base } from "$app/paths";
  type Props = {
    children?: import("svelte").Snippet;
  };

  let { children }: Props = $props();

  let uploadFileModal: UploadFile | undefined = $state();
  let hexModal: Hex | undefined = $state();
</script>

<svelte:head>
  <style lang="scss">
    body {
      margin: auto 0;
      overflow: hidden;
    }
  </style>
</svelte:head>

<div class="container">
  <Toolbar>
    <ToolbarItem
      imageSRC="{base}/upload.png"
      imageAltText="An upload icon"
      onClick={() => {
        uploadFileModal?.exports.modal?.toggle();
      }}
    >
      Upload Map Images
    </ToolbarItem>
    <ToolbarItem
      imageSRC="{base}/hex_grid.png"
      imageAltText="A honeycomb"
      onClick={() => {
        hexModal?.exports.modal?.toggle();
      }}
    >
      Hexes
    </ToolbarItem>
  </Toolbar>

  <UploadFile bind:this={uploadFileModal} />
  <Hex bind:this={hexModal} />

  <div class="main">
    {@render children?.()}
    <PropertiesMenu />
  </div>
</div>

<style lang="scss">
  @use "/src/styles/globals.scss";

  * {
    color: white;
  }

  .container {
    margin-right: 0;
    position: relative;
  }

  .main {
    width: 100%;
    height: calc(100vh - globals.$navigation-bar-height);

    display: flex;
    flex-direction: row;
  }
</style>
