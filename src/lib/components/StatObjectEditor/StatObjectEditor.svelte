<script lang="ts" context="module">
  import type {
    ConditionalModifierData,
    TriggeredCombatEffectApplicatorData,
  } from "$lib/melvor/schema";

  type IStatObjectData = {
    modifiers: Modifiers;
    enemyModifiers: Modifiers;
    combatEffects: TriggeredCombatEffectApplicatorData;
    conditionalModifiers: ConditionalModifierData;
  };

  type Modifiers = {
    key: string;
    values: { key: string; value: string }[];
  }[];

  export type { IStatObjectData, Modifiers };
</script>

<script lang="ts">
  import Interactable from "../Interactable/Interactable.svelte";
  import ModifierList from "./ModifierList.svelte";

  export const values: Required<IStatObjectData> = {
    modifiers: [],
    enemyModifiers: [],
    combatEffects: {},
    conditionalModifiers: {
      modifiers: {},
      enemyModifiers: {},
      condition: {
        type: "DamageType",
        damageType: "melvorD:Normal",
        character: "Player",
        inverted: false,
      },
    },
  };
</script>

<Interactable draggable resizeable>
  <h2>Player Modifiers</h2>
  <ModifierList bind:modifiers={values.modifiers} showHelpButton />
  <h2>Enemy Modifiers</h2>
  <ModifierList bind:modifiers={values.enemyModifiers} />
  <h2>Combat Effects</h2>
  <h2>Conditional Modifiers</h2>
</Interactable>

<style lang="scss">
  h2:first-child {
    margin-top: 0;
  }
</style>
