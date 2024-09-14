<script lang="ts" context="module">
  type Action = {
    iconSRC: string;
    iconAltText: string;
    onClick: (value: object) => void;
  };
</script>

<script lang="ts">
  import { base } from "$app/paths";
  import TableListRow from "./TableListRow.svelte";

  export let values: object[] = [];
  export let keys: string[] | null = null;
  export let actions: Action[] = [];
  export let headers: string[];
  export let itemOnDelete: (item: object) => void = () => {};

  function deleteButtonOnClick(value: object): void {
    values.splice(values.indexOf(value), 1);
    values = values;

    itemOnDelete(value);
  }
</script>

<table>
  <tr>
    {#each headers as header}
      <th>{header}</th>
    {/each}
    <th>Actions</th>
  </tr>

  {#each values as value}
    <tr>
      <TableListRow bind:values={value} {keys} />
      <td>
        {#each actions as action}
          <input
            type="image"
            src={action.iconSRC}
            alt={action.iconAltText}
            on:click={() => {
              action.onClick(value);
            }}
          />
        {/each}
        <input
          type="image"
          src="{base}/delete.png"
          alt="A bin"
          on:click={() => deleteButtonOnClick(value)}
        />
      </td>
    </tr>
  {/each}
</table>

<style lang="scss">
  table,
  :global(td),
  th {
    border: 2px solid #4f4f4f;
    border-collapse: collapse;
  }

  table {
    text-align: center;
  }

  :global(td),
  th {
    padding: 3px 5px;
  }

  tr {
    width: min-content;
  }

  input[type="image"] {
    width: 2em;
    height: 2em;
  }
</style>
