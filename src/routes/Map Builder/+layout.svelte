<script lang="ts">
  import { base } from "$app/paths";
  import Hex from "./lib/components/modals/Hex.svelte";
  import Toolbar from "$lib/components/Toolbar/Toolbar.svelte";
  import UploadFile from "./lib/components/modals/UploadFile.svelte";
  import ToolbarItem from "$lib/components/Toolbar/ToolbarItem.svelte";
  import PropertiesMenu from "./lib/components/PropertiesMenu/PropertiesMenu.svelte";

  let uploadFileModal: UploadFile;
  let hexModal: Hex;
</script>

<div class="container">
  <Toolbar>
    <ToolbarItem
      imageSRC="{base}/upload.png"
      imageAltText="An upload icon"
      onClick={() => {
        uploadFileModal.exports.modal?.toggle();
      }}
    >
      Upload Map Images
    </ToolbarItem>
    <ToolbarItem
      imageSRC="{base}/hex_grid.png"
      imageAltText="A honeycomb"
      onClick={() => {
        hexModal.exports.modal?.toggle();
      }}
    >
      Hexes
    </ToolbarItem>
  </Toolbar>

  <UploadFile bind:this={uploadFileModal} />
  <Hex bind:this={hexModal} />

  <div class="main">
    <slot />
    <PropertiesMenu />
  </div>
</div>

<style lang="scss">
  @import "/src/styles/globals.scss";

  * {
    color: white;
  }

  .container {
    margin-left: $toolbar-width;
    margin-right: 0;
    position: relative;
    min-height: calc(100vh - $navigation-bar-height - 1ch);
  }

  .main {
    width: 100%;
    height: calc(100vh - $navigation-bar-height);

    display: flex;
    flex-direction: row;
  }
</style>
