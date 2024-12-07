<script lang="ts">
  type Props = {
    value?: string[];
    placeholder?: string;
  };

  let { value = $bindable([]), placeholder = "" }: Props = $props();

  let joinedValues = $state(value.join(","));
  let input: HTMLInputElement | undefined = $state();

  function inputOnChange(): void {
    if (input === undefined) {
      return;
    }

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
  onchange={inputOnChange}
  {placeholder}
/>
