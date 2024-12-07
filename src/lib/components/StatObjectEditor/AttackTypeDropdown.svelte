<script lang="ts">
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";
  import type { AttackType } from "$lib/melvor/schema";

  type Props = {
    attackType: AttackType | "any";
    allowAny?: boolean;
  };

  let { attackType = $bindable(), allowAny = false }: Props = $props();
</script>

<Dropdown bind:value={attackType}>
  <DropdownOption value="melee">Melee</DropdownOption>
  <DropdownOption value="ranged">Ranged</DropdownOption>
  <DropdownOption value="magic">Magic</DropdownOption>
  {#if allowAny}
    <DropdownOption value="any">Any</DropdownOption>
  {/if}
</Dropdown>
