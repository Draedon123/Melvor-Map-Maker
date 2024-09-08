<script lang="ts">
  export let value: string[] = [];
  export let placeholder: string = "";

  let joinedValues = value.join(",");
  let input: HTMLInputElement;

  function inputOnChange(): void {
    const values = input.value
      .split(",")
      .map((value) => value.trimStart())
      .filter((value) => value !== "");
    value = values;
  }
</script>

<input
  bind:value={joinedValues}
  bind:this={input}
  on:change={inputOnChange}
  {placeholder}
/>
