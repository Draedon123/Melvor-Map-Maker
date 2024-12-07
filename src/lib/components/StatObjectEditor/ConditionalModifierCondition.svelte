<script lang="ts" module>
  import { Counter } from "$lib/classes/Counter";

  const idGenerator = new Counter();
</script>

<script lang="ts">
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";
  import AttackTypeDropdown from "./AttackTypeDropdown.svelte";
  import ComparisonDropdown from "./ComparisonDropdown.svelte";
  import type { ConditionalModifierData } from "./StatObjectEditor.svelte";

  type Props = {
    condition: ConditionalModifierData["condition"];
    parentCondition?: ConditionalModifierData["condition"] | null;
  };

  let { condition = $bindable(), parentCondition = null }: Props = $props();

  let comparison = $derived(
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
              : "greater than or equal to"
  );

  const id = idGenerator.getNext();
</script>

<p style="margin-bottom: 2px;">Type:</p>

<div class="dropdown">
  <Dropdown bind:value={condition.type} caretFillColour="#ffffff">
    {#if parentCondition === null}
      <DropdownOption value="None" />
    {/if}
    <DropdownOption value="BankItem" />
    <DropdownOption value="Barrier" />
    <DropdownOption value="CombatEffect" />
    <DropdownOption value="CombatEffectGroup" />
    <DropdownOption value="CombatType" />
    <DropdownOption value="DamageType" />
    <DropdownOption value="EquipStatCompare" />
    <DropdownOption value="Every" />
    <DropdownOption value="FightingBoss" />
    <DropdownOption value="FightingSlayerTask" />
    <DropdownOption value="Hitpoints" />
    <DropdownOption value="ItemCharge" />
    <DropdownOption value="PotionUsed" />
    <DropdownOption value="Some" />
  </Dropdown>
</div>

{#if condition.type === "BankItem"}
  <label for="conditionalModifierBankItemID_{id}"> Item ID: </label>
  <input
    bind:value={condition.itemID}
    id="conditionalModifierBankItemID_{id}"
    name="conditionalModifierBankItemID_{id}"
  />

  <label for="conditionalModifierBankItemQuantity_{id}">Quantity:</label>
  <input
    bind:value={condition.value}
    type="number"
    step="1"
    min="1"
    id="conditionalModifierBankItemQuantity_{id}"
    name="conditionalModifierBankItemQuantity_{id}"
  />

  <br />

  <small
    >The player must have at least <strong
      >{condition.value || `(placeholder quantity)`}</strong
    >
    instances of <strong>{condition.itemID || "(placeholder ID)"}</strong> in their
    bank</small
  >
{:else if condition.type === "ItemCharge"}
  <label for="conditionalModifierItemChargeID_{id}"> Item ID: </label>
  <input
    bind:value={condition.itemID}
    id="conditionalModifierItemChargeID_{id}"
    name="conditionalModifierItemChargeID_{id}"
  />

  <label for="conditionalModifierItemChargeQuantity_{id}">Charges:</label>
  <input
    bind:value={condition.value}
    type="number"
    step="1"
    min="0"
    id="conditionalModifierItemChargeQuantity_{id}"
    name="conditionalModifierItemChargeQuantity_{id}"
  />

  <br />

  <small
    >The item {condition.itemID || "(placeholder ID)"} must have at least
    <strong>{condition.value || "(placeholder quantity)"}</strong> charges</small
  >
{:else if condition.type === "PotionUsed"}
  <label for="conditionalModifierPotionsUsedItemID_{id}">Item ID:</label>
  <input
    bind:value={condition.itemID}
    id="conditionalModifierPotionsUsedItemID_{id}"
    name="conditionalModifierPotionsUsedItemID_{id}"
  />

  <br />
  <small>Item ID takes priority over Recipe ID</small>
  <br />

  <label for="conditionalModifierPotionsUsedRecipeID_{id}">Recipe ID:</label>
  <input
    bind:value={condition.recipeID}
    id="conditionalModifierPotionsUsedRecipeID_{id}"
    name="conditionalModifierPotionsUsedRecipeID_{id}"
  />

  <br />

  <div class="vertical-align">
    <label for="conditionalModifierPotionsUsedInvert_{id}"
      >Invert Condition</label
    >
    <input
      type="checkbox"
      bind:checked={condition.inverted}
      id="conditionalModifierPotionsUsedInvert_{id}"
      name="conditionalModifierPotionsUsedInvert_{id}"
    />
  </div>

  <small>
    The player must {condition.inverted ? "not have" : "have"}
    the potion(s)
    <strong
      >{condition.itemID ||
        condition.recipeID ||
        "(placeholder recipe ID)"}</strong
    >
    active
  </small>
{:else if condition.type === "EquipStatCompare"}
  <label for="conditionalModifierEquipStatCompareStatKey_{id}">Stat Key</label>
  <input
    bind:value={condition.statKey}
    id="conditionalModifierEquipStatCompareStatKey_{id}"
    name="conditionalModifierEquipStatCompareStatKey_{id}"
  />

  Comparison:
  <ComparisonDropdown bind:comparison={condition.operator} />

  <label for="conditionalModifierEquipStatCompareDamageType_{id}"
    >Damage Type</label
  >
  <input
    bind:value={condition.damageType}
    id="conditionalModifierEquipStatCompareDamageType_{id}"
    name="conditionalModifierEquipStatCompareDamageType_{id}"
    list="damageTypes"
    placeholder="Optional"
  />

  <br />

  <small>
    The player's <strong>{condition.statKey || "(placeholder stat key)"}</strong
    >
    <strong>
      {condition.damageType === ""
        ? ""
        : `with damage type ${condition.damageType}`}
    </strong>
    must be <strong>{comparison}</strong> the enemy's
  </small>
{:else if condition.type === "FightingSlayerTask"}
  <div class="vertical-align">
    <label for="conditionalModifierFightingSlayerTaskInvert_{id}"
      >Invert Condition</label
    >
    <input
      type="checkbox"
      bind:checked={condition.inverted}
      id="conditionalModifierFightingSlayerTaskInvert_{id}"
      name="conditionalModifierFightingSlayerTaskInvert_{id}"
    />
  </div>

  <small>
    The player
    <strong>{condition.inverted ? "must not" : "must"}</strong>
    be fighting their current slayer task
  </small>
{:else if condition.type !== "None"}
  Character:
  <Dropdown bind:value={condition.character}>
    <DropdownOption value="Player" />
    <DropdownOption value="Enemy" />
  </Dropdown>

  {#if condition.type === "Hitpoints"}
    Comparison:
    <ComparisonDropdown bind:comparison={condition.operator} />

    <label for="conditionalModifierHitpoints_{id}">Hitpoints:</label>
    <input
      bind:value={condition.value}
      type="number"
      id="conditionalModifierHitpoints_{id}"
      name="conditionalModifierHitpoints_{id}"
    />

    <br />

    <small>
      The <strong>{condition.character}</strong> hitpoints must be
      <strong>{comparison}</strong>
      {condition.value || "(placeholder hitpoints)"}
    </small>
  {:else if condition.type === "CombatType"}
    {condition.character} Attack Type:
    <AttackTypeDropdown allowAny bind:attackType={condition.thisAttackType} />

    Target Attack Type:
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
    <label for="conditionalModifierDamageType_{id}">Damage Type:</label>
    <input
      bind:value={condition.damageType}
      list="damageTypes"
      id="conditionalModifierDamageType_{id}"
      name="conditionalModifierDamageType_{id}"
    />

    <small>
      The <strong>{condition.character}</strong> must be using the damage type
      <strong>{condition.damageType}</strong>
    </small>
  {:else if condition.type === "Barrier"}
    Comparison:
    <ComparisonDropdown bind:comparison={condition.operator} />

    <label for="conditionalModifierBarrier_{id}">Barrier Percent</label>
    <input
      bind:value={condition.value}
      type="number"
      id="conditionalModifierBarrier_{id}"
      name="conditionalModifierBarrier_{id}"
    />

    <br />

    <small>
      The <strong>{condition.character}</strong> must have their barrier percent
      <strong>{comparison}</strong>
      {condition.value}%
    </small>
  {:else if condition.type === "CombatEffectGroup"}
    <label for="conditionalModifierCombatEffectGroupGroupID_{id}"
      >Group ID:</label
    >
    <input
      bind:value={condition.groupID}
      id="conditionalModifierCombatEffectGroupGroupID_{id}"
      name="conditionalModifierCombatEffectGroupGroupID_{id}"
    />

    <div class="vertical-align">
      <label for="conditionalModifierCombatEffectGroupInvert_{id}"
        >Invert Condition</label
      >
      <input
        type="checkbox"
        id="conditionalModifierCombatEffectGroupInvert_{id}"
        name="conditionalModifierCombatEffectGroupInvert_{id}"
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
    <label for="conditionalModifierCombatEffectEffectID_{id}">Effect ID:</label>
    <input
      bind:value={condition.effectID}
      id="conditionalModifierCombatEffectEffectID_{id}"
      name="conditionalModifierCombatEffectEffectID_{id}"
    />

    <div class="vertical-align">
      <label for="conditionalModifierCombatEffectInvert_{id}"
        >Invert Condition</label
      >
      <input
        type="checkbox"
        id="conditionalModifierCombatEffectInvert_{id}"
        name="conditionalModifierCombatEffectInvert_{id}"
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
      <label for="conditionalModifierFightingBossInvert_{id}"
        >Invert Condition</label
      >
      <input
        type="checkbox"
        id="conditionalModifierFightingBossInvert_{id}"
        name="conditionalModifierFightingBossInvert_{id}"
        bind:checked={condition.inverted}
      />
    </div>

    <small>
      The player must {condition.inverted ? "not be" : "be"} fighting a boss
    </small>
  {/if}
{:else if condition.type === "None"}
  No condition selected
{/if}

<style lang="scss">
  @use "/src/styles/input.scss";
  @use "/src/styles/switch.scss";

  :global(.dropdownButton) {
    background-color: #1f1f1f !important;
    z-index: 2;
  }

  input:not([type="checkbox"]) {
    & {
      @include input.input();
    }

    & {
      font-size: small;
      height: 1.5em;
    }
  }

  input[type="checkbox"] {
    @include switch.switch();
  }

  .vertical-align {
    display: flex;
    align-items: center;
  }
</style>
