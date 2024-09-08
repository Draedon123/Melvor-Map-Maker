<script lang="ts" context="module">
  let currentID = 0;

  function getNewID(): number {
    return currentID++;
  }
</script>

<script lang="ts">
  import store from "../../store/store";

  export let imageSRC: string;
  export let imageAltText: string;

  export const id = getNewID();

  function iconOnClick(): void {
    $store.propertiesMenu.activeTab = id;
  }
</script>

<input
  type="image"
  src={imageSRC}
  alt={imageAltText}
  class:active={id === $store.propertiesMenu.activeTab}
  on:click={iconOnClick}
/>
<div class:hidden={id !== $store.propertiesMenu.activeTab}>
  <slot />
</div>

<style lang="scss">
  $image-dimensions: 1.5em;

  input[type="image"] {
    width: $image-dimensions;
    height: $image-dimensions;

    padding: 0.2em;
    margin-top: 2px;

    font-size: medium;

    background-color: #222222;

    border-top: 3px solid #666666;
    border-left: 3px solid #666666;
    border-bottom: 3px solid #111111;
    border-right: 3px solid #111111;

    border-radius: 2px;

    &.active {
      background-color: #1b1b1b;

      border-top: 3px solid #000000;
      border-left: 3px solid #000000;
      border-bottom: 3px solid #555555;
      border-right: 3px solid #555555;
    }

    &:hover {
      background-color: #555555;

      &.active {
        background-color: #444444;
      }
    }
  }

  div {
    margin-left: calc($image-dimensions + 2ch);
    position: absolute;
  }
</style>
