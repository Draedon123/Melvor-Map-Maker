<script lang="ts">
  import TableListCell from "./TableListCell.svelte";

  type Props = {
    values: object;
    keys: string[] | null;
  };

  let { values = $bindable(), keys }: Props = $props();

  let objectKeys = $derived(Object.keys(values) as (keyof typeof values)[]);
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
