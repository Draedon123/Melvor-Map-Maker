<svelte:options accessors />

<script lang="ts">
  import HexTab from "./Tabs/HexTab.svelte";

  export let hidden: boolean = false;
</script>

<div class="container" class:hidden>
  <HexTab />
</div>

<style lang="scss">
  @import "/src/styles/scrollbar.scss";

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

    @include scrollbar();
  }
</style>
