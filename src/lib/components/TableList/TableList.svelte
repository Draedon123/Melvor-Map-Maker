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
</style>
