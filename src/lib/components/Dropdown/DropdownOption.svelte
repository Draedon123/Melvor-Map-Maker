<script lang="ts">
  import { getContext } from "svelte";
  import type { DropdownContext } from "./Dropdown.svelte";

  export let value: string;

  const context = getContext<DropdownContext>("dropdown");

  let button: HTMLButtonElement;
  let textContext: string = value;

  function buttonOnClick(): void {
    context.setValue(value);
    context.setTextContext(textContext || (button.textContent ?? ""));
    context.onChange(value);
    context.hide();
  }
</script>

<button on:click|stopPropagation={buttonOnClick} bind:this={button}>
  <slot>{value}</slot>
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
