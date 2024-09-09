<script lang="ts">
  export let value: string | number;
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
  <input type="number" bind:value on:change={numberInputOnChange} />
{:else}
  <input bind:value />
{/if}

<style lang="scss">
  @import "/src/styles/input.scss";

  input {
    & {
      @include input();
    }

    & {
      width: 90%;
      font-size: small;
    }
  }
</style>
