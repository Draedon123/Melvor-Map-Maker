<script lang="ts">
  import { getContext } from "svelte";
  import type { DropdownContext } from "./Dropdown.svelte";

  export let textContext: string = "";
  export let value: string = textContext;

  const context = getContext<DropdownContext>("dropdown");

  let button: HTMLButtonElement;

  function buttonOnClick(): void {
    context.setValue(value);
    context.setTextContext(textContext || (button.textContent ?? ""));
    context.hide();
  }
</script>

<button on:click={buttonOnClick} bind:this={button}>
  <slot />
</button>

<style lang="scss">
  @import "/src/styles/button.scss";

  button {
    & {
      @include button(#4f4f4f);
    }

    & {
      height: 1em;
      font-size: small;
      border: 0;
      border-radius: 0;

      border-top: 1px solid black !important;
    }
  }
</style>
