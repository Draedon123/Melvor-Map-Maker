<script lang="ts">
  import TableListCell from "./TableListCell.svelte";

  export let values: object;

  $: keys = Object.keys(values) as (keyof typeof values)[];
</script>

{#each keys as key}
  <td>
    <TableListCell bind:value={values[key]} />
  </td>
{/each}
