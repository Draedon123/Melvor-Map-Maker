<script lang="ts" module>
  const CURRENCIES_TABLE_HEADERS: string[] = ["Currency ID", "Quantity"];

  const ITEMS_TABLE_HEADERS: string[] = ["Item ID", "Quantity"];
</script>

<script lang="ts">
  import TableList from "./TableList.svelte";
  import type { FixedCostsData } from "$lib/melvor/schema";

  type Props = {
    costs?: Required<Omit<FixedCostsData, "gp" | "sc">>;
    headerLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  };

  let {
    costs = $bindable({
      currencies: [],
      items: [],
    }),
    headerLevel = 6,
  }: Props = $props();

  function addNewCurrency(): void {
    costs.currencies.push({
      id: "melvorD:GP",
      quantity: 69,
    });

    costs = costs;
  }

  function addNewItem(): void {
    costs.items.push({
      id: "melvorD:Red_Party_Hat",
      quantity: 69,
    });

    costs = costs;
  }
</script>

<svelte:element this={`h${headerLevel}`}>Currencies</svelte:element>
<button onclick={addNewCurrency}>Add new Currency</button>
<TableList bind:values={costs.currencies} headers={CURRENCIES_TABLE_HEADERS} />

<svelte:element this={`h${headerLevel}`}>Items</svelte:element>
<button onclick={addNewItem}>Add new Item</button>
<TableList bind:values={costs.items} headers={ITEMS_TABLE_HEADERS} />

<style lang="scss">
  @use "/src/styles/input.scss";

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 3px 0;
    font-size: medium;
  }

  button {
    & {
      @include input.input();
    }

    & {
      font-size: medium;
      margin-bottom: 5px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
