<svelte:options accessors />

<script lang="ts">
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";
  import AttackTypeDropdown from "./AttackTypeDropdown.svelte";
  import ComparisonDropdown from "./ComparisonDropdown.svelte";
  import type { CombatEffectApplicatorData } from "./StatObjectEditor.svelte";

  export let condition: CombatEffectApplicatorData["condition"];
  export let parentCondition: CombatEffectApplicatorData["condition"] | null =
    null;
  export let parentlessDelete: (
    condition: CombatEffectApplicatorData["condition"]
  ) => void = () => {};

  $: comparison =
    condition.operator === "=="
      ? "equal to"
      : condition.operator === "!="
        ? "not equal to"
        : condition.operator === "<"
          ? "less than"
          : condition.operator === ">"
            ? "greater than"
            : condition.operator === "<="
              ? "less than or equal to"
              : "greater than or equal to";

  function newCondition(): void {
    condition.conditions.push({
      character: "Enemy",
      conditions: [],
      damageType: "melvorD:Normal",
      effectID: "melvorD:Stun",
      groupID: "melvorD:Stun",
      inverted: false,
      lhValue: "self.abyssalLevels.Corruption",
      operator: ">=",
      rhValue: 5,
      targetAttackType: "any",
      thisAttackType: "any",
      type: "Hitpoints",
      value: 10,
    });

    condition = condition;
  }

  function deleteSelf(): void {
    if (parentCondition === null) {
      parentlessDelete(condition);

      return;
    }

    parentCondition.conditions.splice(
      parentCondition.conditions.indexOf(condition),
      1
    );
  }
</script>

<p style="margin-bottom: 2px;">Type:</p>
<Dropdown bind:value={condition.type} caretFillColour="#ffffff">
  <DropdownOption value="Barrier" />
  <DropdownOption value="CharacterValue" />
  <DropdownOption value="CombatEffect" />
  <DropdownOption value="CombatEffectGroup" />
  <DropdownOption value="CombatType" />
  <DropdownOption value="DamageDealt" />
  <DropdownOption value="DamageTaken" />
  <DropdownOption value="DamageType" />
  <DropdownOption value="Every" />
  <DropdownOption value="FightingBoss" />
  <DropdownOption value="Hitpoints" />
  <DropdownOption value="Some" />
</Dropdown>

{#if condition.type === "Some" || condition.type === "Every"}
  <button on:click={newCondition}>New Condition</button>

  <ul>
    {#each condition.conditions as subCondition}
      <li>
        <svelte:self bind:condition={subCondition} />
      </li>
    {/each}
  </ul>

  <small>
    {condition.type === "Every"
      ? "Every single condition"
      : "At least one of the conditions"}
    must be met for the effect to be applied
  </small>
{:else if condition.type === "DamageDealt" || condition.type === "DamageTaken"}
  Comparison:
  <ComparisonDropdown bind:comparison={condition.operator} />
  Value:
  <input bind:value={condition.rhValue} />

  <br />

  <small>
    The damage
    <strong>
      {condition.type === "DamageDealt" ? "dealt" : "taken"}
    </strong>
    must be <strong>{comparison} {condition.rhValue || "(placeholder)"}</strong>
  </small>
{:else if condition.type === "CharacterValue"}
  Left Hand Value:
  <input bind:value={condition.lhValue} />
  Comparison:
  <ComparisonDropdown bind:comparison={condition.operator} />
  Right Hand Value:
  <input bind:value={condition.rhValue} />

  <br />

  <small>
    <strong>
      {condition.lhValue || "(placeholder)"}
    </strong>
    must be <strong>{comparison}</strong>
    <strong>{condition.rhValue || "(placeholder)"}</strong>
  </small>
{:else}
  Character:
  <Dropdown bind:value={condition.character}>
    <DropdownOption value="Player" />
    <DropdownOption value="Enemy" />
  </Dropdown>

  {#if condition.type === "Hitpoints"}
    Comparison:
    <ComparisonDropdown bind:comparison={condition.operator} />

    Hitpoints:
    <input bind:value={condition.value} type="number" />

    <br />

    <small>
      The <strong>{condition.character}</strong> hitpoints must be
      <strong>{comparison}</strong>
      {condition.value}
    </small>
  {:else if condition.type === "CombatType"}
    This Attack Type
    <AttackTypeDropdown allowAny bind:attackType={condition.thisAttackType} />

    Target Attack Type
    <AttackTypeDropdown allowAny bind:attackType={condition.targetAttackType} />

    <div class="vertical-align">
      Invert Condition <input
        type="checkbox"
        bind:checked={condition.inverted}
      />
    </div>

    <small>
      {#if condition.thisAttackType === "any" && condition.targetAttackType !== "any"}
        The
        <strong>{condition.character === "Enemy" ? "Player" : "Enemy"}</strong>
        must {condition.inverted ? "not be" : " be"} using
        <strong>{condition.targetAttackType}</strong>
      {:else if condition.thisAttackType !== "any" && condition.targetAttackType === "any"}
        The <strong>{condition.character}</strong>
        must {condition.inverted ? "not be" : " be"} using
        <strong>{condition.thisAttackType}</strong>
      {:else if condition.thisAttackType !== "any" && condition.targetAttackType !== "any"}
        The <strong>{condition.character}</strong>
        must {condition.inverted ? "not be" : " be"} using
        <strong>{condition.thisAttackType}</strong>
        {condition.inverted ? "or" : "and"}
        the
        <strong>{condition.character === "Enemy" ? "Player" : "Enemy"}</strong>
        must {condition.inverted ? "not be" : " be"} using
        <strong>{condition.targetAttackType}</strong>
      {:else if condition.thisAttackType === "any" && condition.targetAttackType === "any"}
        This effect will
        <strong>{condition.inverted ? "never" : "always"}</strong>
        be active
      {/if}
    </small>
  {:else if condition.type === "DamageType"}
    Damage Type:
    <input bind:value={condition.damageType} list="damageTypes" />

    <small>
      The <strong>{condition.character}</strong> must be using the damage type
      <strong>{condition.damageType}</strong>
    </small>
  {:else if condition.type === "Barrier"}
    Comparison:
    <ComparisonDropdown bind:comparison={condition.operator} />

    Barrier Percent:
    <input bind:value={condition.value} type="number" />

    <br />

    <small>
      The <strong>{condition.character}</strong> must have their barrier percent
      <strong>{comparison}</strong>
      {condition.value}%
    </small>
  {:else if condition.type === "CombatEffectGroup"}
    Group ID:
    <input bind:value={condition.groupID} />

    <div class="vertical-align">
      Invert Condition <input
        type="checkbox"
        bind:checked={condition.inverted}
      />
    </div>

    <small>
      The <strong>{condition.character}</strong> must
      {condition.inverted ? "not have" : "have"}
      an effect belonging to the group
      <strong>{condition.groupID}</strong> active
    </small>
  {:else if condition.type === "CombatEffect"}
    Effect ID:
    <input bind:value={condition.effectID} />

    <div class="vertical-align">
      Invert Condition <input
        type="checkbox"
        bind:checked={condition.inverted}
      />
    </div>

    <small>
      The <strong>{condition.character}</strong> must
      {condition.inverted ? "not have" : "have"}
      the combat effect
      <strong>{condition.groupID}</strong> active
    </small>
  {:else if condition.type === "FightingBoss"}
    <div class="vertical-align">
      Invert Condition <input
        type="checkbox"
        bind:checked={condition.inverted}
      />
    </div>

    <small>
      The player must {condition.inverted ? "not be" : "be"} fighting a boss
    </small>
  {/if}
{/if}

<br />

<button class="delete" on:click={deleteSelf}>Delete Effect</button>

<style lang="scss">
  @import "/src/styles/button.scss";
  @import "/src/styles/input.scss";
  @import "/src/styles/switch.scss";

  input:not([type="checkbox"]) {
    & {
      @include input();
    }
  }

  input[type="checkbox"] {
    @include switch();
  }

  .vertical-align {
    display: flex;
    align-items: center;
  }

  button {
    & {
      @include button(#659ca7);
    }

    & {
      font-size: small !important;
      height: 1.5em !important;
    }
  }

  button.delete {
    @include button(#b60000);
  }
</style>
