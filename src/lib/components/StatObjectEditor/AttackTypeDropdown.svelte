<script lang="ts">
  import type { AttackType } from "$lib/melvor/schema";
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";

  export let attackType: AttackType | "any";
  export let allowAny: boolean = false;
</script>

<Dropdown bind:value={attackType}>
  <DropdownOption value="melee">Melee</DropdownOption>
  <DropdownOption value="ranged">Ranged</DropdownOption>
  <DropdownOption value="magic">Magic</DropdownOption>
  {#if allowAny}
    <DropdownOption value="any">Any</DropdownOption>
  {/if}
</Dropdown>
