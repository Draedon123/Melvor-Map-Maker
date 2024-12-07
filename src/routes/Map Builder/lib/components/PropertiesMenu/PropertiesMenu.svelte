<script lang="ts">
  import HexTab from "./Tabs/HexTab.svelte";
  import PoiTab from "./Tabs/PoiTab.svelte";

  type Props = {
    hidden?: boolean;
  };

  let { hidden = false }: Props = $props();

  export { hidden };
</script>

<div class="container" class:hidden>
  <HexTab />
  <PoiTab />
</div>

<style lang="scss">
  @use "/src/styles/scrollbar.scss";

  .container {
    height: 100%;
    width: 25vw;

    padding: 0.5em 1ch;
    background-color: #1f1f1f;
    overflow-x: scroll;
    overflow-y: scroll;

    z-index: 10;
    float: right;
    position: relative;

    flex-grow: 0;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;

    user-select: none;

    @include scrollbar.scrollbar();
  }
</style>
