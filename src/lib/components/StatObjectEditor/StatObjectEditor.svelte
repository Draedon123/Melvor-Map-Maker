<script lang="ts" context="module">
  import type {
    AttackType,
    CharacterNumberExpression,
    CombatEffectApplicatorConditionData,
    CombatEffectApplicatorTriggerData,
    CombatEffectGroupID,
    CombatEffectID,
    Comparison,
    ConditionalModifierConditionData,
    DamageTypeID,
    EquipStatKey,
  } from "$lib/melvor/schema";

  type IStatObjectData = {
    modifiers: Modifiers;
    enemyModifiers: Modifiers;
    combatEffects: TriggeredData[];
    conditionalModifiers: ConditionalModifierData[];
  };

  type ConditionalModifierData = {
    condition: {
      type: ConditionalModifierConditionData["type"] | "None";
      character: "Player" | "Enemy";
      itemID: string;
      value: number;
      recipeID: string;
      inverted: boolean;
      operator: Comparison;
      statKey: EquipStatKey;
      damageType: DamageTypeID;
      thisAttackType: AttackType | "any";
      targetAttackType: AttackType | "any";
      groupID: CombatEffectGroupID;
      effectID: CombatEffectID;
      conditions: ConditionalModifierData["condition"][];
    };
    modifiers: Modifiers;
    enemyModifiers: Modifiers;
    isNegative: boolean;
    description: string;
    descriptionLang: string;
  };

  type TriggeredData = Required<CombatEffectApplicatorTriggerData> &
    CombatEffectApplicatorData &
    (SingleTriggeredEffect | TableTriggeredEffect);
  type SingleTriggeredEffect = {
    type: "single";
    effectID: string;
    initialParams: {
      name: string;
      value: number;
    }[];
  };
  type TableTriggeredEffect = {
    type: "table";
    tableID: string;
  };
  type CombatEffectApplicatorData = {
    chance: number;
    condition: {
      type: CombatEffectApplicatorConditionData["type"] | "None";
      operator: Comparison;
      rhValue: CharacterNumberExpression;
      lhValue: CharacterNumberExpression;
      character: "Player" | "Enemy";
      thisAttackType: AttackType | "any";
      targetAttackType: AttackType | "any";
      damageType: DamageTypeID;
      value: number;
      inverted: boolean;
      groupID: CombatEffectGroupID;
      effectID: CombatEffectID;
      conditions: CombatEffectApplicatorData["condition"][];
    };
    targetOverride: "Self" | "Target" | "";
    bypassBarrier: boolean;
  };

  type Modifiers = {
    key: string;
    values: { key: string; value: string }[];
  }[];

  export type {
    IStatObjectData,
    Modifiers,
    TriggeredData,
    CombatEffectApplicatorData,
    ConditionalModifierData,
  };
</script>

<script lang="ts">
  import Interactable from "../Interactable/Interactable.svelte";
  import ConditionalModifierEditor from "./ConditionalModifierEditor.svelte";
  import ModifierList from "./ModifierList.svelte";
  import TriggeredCombatEffectApplicatorList from "./TriggeredCombatEffectApplicatorList.svelte";

  export const values: Required<IStatObjectData> = {
    modifiers: [],
    enemyModifiers: [],
    combatEffects: [],
    conditionalModifiers: [],
  };
</script>

<Interactable draggable resizeable style="max-height: 80vh; overflow-y: scroll">
  <h2>Player Modifiers</h2>
  <ModifierList bind:modifiers={values.modifiers} showHelpButton />
  <h2>Enemy Modifiers</h2>
  <ModifierList bind:modifiers={values.enemyModifiers} />
  <h2>Combat Effects</h2>
  <TriggeredCombatEffectApplicatorList bind:effects={values.combatEffects} />
  <h2>Conditional Modifiers</h2>
  <ConditionalModifierEditor bind:modifiers={values.conditionalModifiers} />
</Interactable>

<style lang="scss">
  h2:first-child {
    margin-top: 0;
  }
</style>
