<script lang="ts">
  import { getContext } from "svelte";
  import type { DropdownContext } from "./Dropdown.svelte";

  type Props = {
    value: string;
    children?: import("svelte").Snippet;
  };

  let { value, children }: Props = $props();

  const context = getContext<DropdownContext>("dropdown");

  let button: HTMLButtonElement | undefined = $state();

  function buttonOnClick(event: MouseEvent): void {
    event.stopPropagation();

    if (button === undefined) {
      return;
    }

    context.setValue(value);
    context.setTextContext(button.textContent ?? "");
    context.onChange(value);
    context.hide();
  }
</script>

<button onclick={buttonOnClick} bind:this={button}>
  {#if children}
    {@render children()}
  {:else}
    {value}
  {/if}
</button>

<style lang="scss">
  @use "/src/styles/button.scss";

  button {
    & {
      @include button.button(#4f4f4f);
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
