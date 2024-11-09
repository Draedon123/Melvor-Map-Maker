<script lang="ts">
  import ConditionalModifierCondition from "./ConditionalModifierCondition.svelte";
  import type { ConditionalModifierData } from "./StatObjectEditor.svelte";

  export let modifiers: ConditionalModifierData[] = [];

  function newModifier(): void {
    modifiers.push({
      condition: {
        character: "Player",
        conditions: [],
        damageType: "melvorD:Normal",
        inverted: false,
        itemID: "melvorD:Red_Party_Hat",
        operator: "==",
        recipeID: "melvorF:Diamond_Luck_Potion",
        statKey: "attackSpeed",
        type: "BankItem",
        value: 0,
      },
      description: "",
      descriptionLang: "",
      enemyModifiers: [],
      isNegative: false,
      modifiers: [],
    });

    modifiers = modifiers;
  }
</script>

<button on:click={newModifier}>New Conditional Modifier</button>

<ul>
  {#each modifiers as modifier}
    <li>
      Condition:

      <ConditionalModifierCondition bind:condition={modifier.condition} />
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "/src/styles/button.scss";

  button {
    & {
      @include button(#659ca7);
    }

    & {
      font-size: small !important;
      height: 1.5em !important;
    }
  }
</style>
