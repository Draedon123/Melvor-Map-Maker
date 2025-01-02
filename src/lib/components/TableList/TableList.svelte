<script lang="ts" module>
  type Action = {
    iconSRC: string;
    iconAltText: string;
    onClick: (value: object) => void;
  };
</script>

<script lang="ts">
  import TableListRow from "./TableListRow.svelte";
  import { base } from "$app/paths";

  type Props = {
    values?: object[];
    keys?: string[] | null;
    actions?: Action[];
    headers: string[];
    itemOnDelete?: (item: object) => void;
  };

  let {
    values = $bindable([]),
    keys = null,
    actions = [],
    headers,
    itemOnDelete = () => {},
  }: Props = $props();

  const valuesReactive = $state(values);

  function deleteButtonOnClick(value: object): void {
    values.splice(values.indexOf(value), 1);
    values = values;

    itemOnDelete(value);
  }

  $effect(() => {
    values = valuesReactive;
  });
</script>

<table>
  <thead>
    <tr>
      {#each headers as header}
        <th>{header}</th>
      {/each}
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {#each valuesReactive as value, index}
      <tr>
        <TableListRow bind:values={valuesReactive[index]} {keys} />
        <td>
          <div class="actions">
            {#each actions as action}
              <input
                class="icon"
                type="image"
                src={action.iconSRC}
                alt={action.iconAltText}
                onclick={() => {
                  action.onClick(value);
                }}
              />
            {/each}
            <input
              class="icon"
              type="image"
              src="{base}/delete.png"
              alt="A bin"
              onclick={() => deleteButtonOnClick(value)}
            />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  .icon {
    width: 2em;
    aspect-ratio: 1;
  }

  table,
  tr,
  th,
  td {
    border: 1px solid white;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 5px;
  }

  .actions {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
  }
</style>
