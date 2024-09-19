<script lang="ts">
  import type { Comparison } from "$lib/melvor/schema";
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";

  export let comparison: Comparison;
</script>

<Dropdown bind:value={comparison}>
  <DropdownOption value="==">Equals (==)</DropdownOption>
  <DropdownOption value="!=">Not Equals (!=)</DropdownOption>
  <DropdownOption value=">">Greater Than (&gt)</DropdownOption>
  <DropdownOption value="<">Less Than (&lt)</DropdownOption>
  <DropdownOption value="<=">Less Than Or Equal To (&le)</DropdownOption>
  <DropdownOption value=">=">Greater Than Or Equal To (&ge)</DropdownOption>
</Dropdown>
