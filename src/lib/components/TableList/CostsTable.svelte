<script lang="ts" context="module">
  const CURRENCIES_TABLE_HEADERS: string[] = ["Currency ID", "Quantity"];

  const ITEMS_TABLE_HEADERS: string[] = ["Item ID", "Quantity"];
</script>

<script lang="ts">
  import type { FixedCostsData } from "$lib/melvor/schema";
  import TableList from "./TableList.svelte";

  export let costs: Required<Omit<FixedCostsData, "gp" | "sc">> = {
    currencies: [],
    items: [],
  };
  export let headerLevel: 1 | 2 | 3 | 4 | 5 | 6 = 6;

  let currenciesList: TableList;
  let itemsList: TableList;

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
<button on:click={addNewCurrency}>Add new Currency</button>
<TableList
  bind:this={currenciesList}
  bind:values={costs.currencies}
  headers={CURRENCIES_TABLE_HEADERS}
/>

<svelte:element this={`h${headerLevel}`}>Items</svelte:element>
<button on:click={addNewItem}>Add new Item</button>
<TableList
  bind:this={itemsList}
  bind:values={costs.items}
  headers={ITEMS_TABLE_HEADERS}
/>

<style lang="scss">
  @import "/src/styles/input.scss";

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
      @include input();
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
