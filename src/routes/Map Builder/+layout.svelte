<script>
  import { base } from "$app/paths";
  import Toolbar from "$lib/components/Toolbar/Toolbar.svelte";
  import ToolbarItem from "$lib/components/Toolbar/ToolbarItem.svelte";
</script>

<div class="container">
  <Toolbar>
    <ToolbarItem
      imageSRC="{base}/preview.png"
      imageAltText="A document and a magnifying glass"
    >
      Placeholder
    </ToolbarItem>
  </Toolbar>

  <div class="main">
    <slot />
  </div>
</div>

<style lang="scss">
  @import "/src/styles/globals.scss";

  .container {
    margin-left: $toolbar-width;
    margin-right: 0;
    position: relative;
    min-height: calc(100vh - $navigation-bar-height - 1ch);
  }
</style>
