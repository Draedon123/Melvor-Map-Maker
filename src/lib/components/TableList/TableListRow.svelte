<script lang="ts">
  import TableListCell from "./TableListCell.svelte";

  export let values: object;
  export let keys: string[] | null;

  $: objectKeys = Object.keys(values) as (keyof typeof values)[];
</script>

{#each objectKeys as key}
  {#if keys !== null}
    {#if keys.includes(key)}
      <td>
        <TableListCell bind:value={values[key]} />
      </td>
    {/if}
  {:else}
    <td>
      <TableListCell bind:value={values[key]} />
    </td>
  {/if}
{/each}
