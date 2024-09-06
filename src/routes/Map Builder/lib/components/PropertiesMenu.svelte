<svelte:options accessors />

<script lang="ts">
  export let hidden: boolean = false;

  let container: HTMLDivElement;
</script>

<div bind:this={container} class="container" class:hidden>
  asd <br />
</div>

<style lang="scss">
  .container {
    height: 100%;
    width: 25vw;

    padding: 0.5em 1ch;
    background-color: #1f1f1f;
    overflow-x: hidden;
    overflow-y: scroll;

    z-index: 999;
    float: right;
    position: relative;

    flex-grow: 0;
    flex-shrink: 0;

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
