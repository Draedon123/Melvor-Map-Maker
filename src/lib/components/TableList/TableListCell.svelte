<script lang="ts">
  type Props = {
    value: string | number;
  };

  let { value = $bindable() }: Props = $props();
  const inputType = typeof value === "number" ? "number" : "text";

  function numberInputOnChange(event: {
    currentTarget: HTMLInputElement;
  }): void {
    const inputValue = parseFloat(event.currentTarget.value);

    if (isNaN(inputValue)) {
      value = 0;
    }
  }
</script>

{#if inputType === "number"}
  <input type="number" bind:value onchange={numberInputOnChange} />
{:else}
  <input bind:value />
{/if}

<style lang="scss">
  @use "/src/styles/input.scss";

  input {
    & {
      @include input.input();
    }

    & {
      width: 90%;
      font-size: small;
    }
  }
</style>
