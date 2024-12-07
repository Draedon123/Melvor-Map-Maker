<script lang="ts" module>
  const idGenerator = new Counter();
</script>

<script lang="ts">
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";
  import EffectCondition from "./EffectCondition.svelte";
  import { base } from "$app/paths";
  import { Counter } from "$lib/classes/Counter";
  import type { TriggeredData } from "./StatObjectEditor.svelte";
  import type { SingleCombatEffectApplicatorData } from "$lib/melvor/schema";

  type Props = {
    effects?: TriggeredData[];
  };

  let { effects = $bindable([]) }: Props = $props();
  let effectCondition: EffectCondition | undefined = $state();

  const id = idGenerator.getNext();

  function newEffect(): void {
    effects.push({
      type: "single",
      appliesWhen: "HitByAttack",
      applyEffectWhenMerged: false,
      bypassBarrier: false,
      chance: 100,
      condition: {
        character: "Enemy",
        conditions: [],
        damageType: "melvorD:Normal",
        effectID: "melvorD:Stun",
        groupID: "melvorD:Stun",
        inverted: false,
        lhValue: "self.abyssalLevels.Corruption",
        operator: ">=",
        rhValue: 5,
        targetAttackType: "melee",
        thisAttackType: "any",
        type: "Hitpoints",
        value: 10,
      },
      customDescription: "",
      descriptionLang: "",
      effectID: "melvorD:Stun",
      initialParams: [],
      isNegative: false,
      targetOverride: "",
    });

    effects = effects;
  }

  function newParameter(effect: TriggeredData): void {
    if (!("initialParams" in effect)) {
      return;
    }

    effect.initialParams.push({
      name: "",
      value: 0,
    });

    effects = effects;
  }

  function deleteEffect(effect: TriggeredData): void {
    effects.splice(effects.indexOf(effect), 1);

    effects = effects;
  }

  function deleteInitialParameter(
    effect: TriggeredData,
    initialParameter: Required<SingleCombatEffectApplicatorData>["initialParams"][number]
  ): void {
    if (!("initialParams" in effect)) {
      return;
    }

    effect.initialParams.splice(
      effect.initialParams.indexOf(initialParameter),
      1
    );

    effects = effects;
  }
</script>

<button onclick={newEffect}>New Combat Effect</button>
<ul>
  {#each effects as effect, index}
    <li>
      <h3>Type:</h3>
      <div class="dropdown z-index-1">
        <Dropdown
          bind:value={effect.type}
          caretFillColour="#ffffff"
          style="z-index: 1"
          textContent={effect.type
            .slice(0, 1)
            .toUpperCase()
            .concat(effect.type.slice(1))}
        >
          <DropdownOption value="single">Single</DropdownOption>
          <DropdownOption value="table">Table</DropdownOption>
        </Dropdown>
      </div>

      <hr />

      <h3>Applies When</h3>
      <div class="dropdown">
        <Dropdown bind:value={effect.appliesWhen} caretFillColour="#ffffff">
          <DropdownOption value="PreAttack" />
          <DropdownOption value="HitByAttack" />
          <DropdownOption value="HitByFirstAttack" />
          <DropdownOption value="HitWithAttack" />
          <DropdownOption value="HitWithFirstAttack" />
          <DropdownOption value="CritWithAttack" />
          <DropdownOption value="PostAttachk" />
          <DropdownOption value="PostFirstAttack" />
          <DropdownOption value="StartOfFight" />
          <DropdownOption value="SummonAttack" />
          <DropdownOption value="WasAttacked" />
          <DropdownOption value="Rebirth" />
          <DropdownOption value="BeingAttacked" />
          <DropdownOption value="EvadedAttack" />
        </Dropdown>
      </div>

      <hr />

      <div class="vertical-align">
        <label for="applyEffectWhenMerged_{id}_{index}"
          >Apply Effect When Merged</label
        >
        <input
          type="checkbox"
          id="applyEffectWhenMerged_{id}_{index}"
          name="applyEffectWhenMerged_{id}_{index}"
          bind:checked={effect.applyEffectWhenMerged}
        />
      </div>

      <hr />

      <label for="effectCustomDescription_{id}_{index}"
        >Custom Description:</label
      >
      <input
        bind:value={effect.customDescription}
        id="effectCustomDescription_{id}_{index}"
        name="effectCustomDescription_{id}_{index}"
      />

      <hr />

      <label for="effectDescriptionLanguageID_{id}_{index}"
        >Description Language String ID</label
      >
      <input
        bind:value={effect.descriptionLang}
        id="effectDescriptionLanguageID_{id}_{index}"
        name="effectDescriptionLanguageID_{id}_{index}"
      />

      <hr />

      <div class="vertical-align">
        <label for="effectIsNegative_{id}_{index}">Is negative</label>
        <input
          type="checkbox"
          id="effectIsNegative_{id}_{index}"
          name="effectIsNegative_{id}_{index}"
          bind:checked={effect.isNegative}
        />
      </div>

      <hr />

      <label for="effectChance_{id}_{index}">Chance:</label>
      <input
        bind:value={effect.chance}
        type="number"
        id="effectChance_{id}_{index}"
        name="effectChance_{id}_{index}"
        min="0"
        max="100"
      />

      <hr />

      Condition:
      <div class="dropdown">
        <EffectCondition
          bind:this={effectCondition}
          condition={effect.condition}
        />
      </div>

      <br />

      <div class="dropdown">
        Target Override:
        <Dropdown
          bind:value={effect.targetOverride}
          textContent={effect.targetOverride === ""
            ? "None"
            : effect.targetOverride}
          caretFillColour="#ffffff"
        >
          <DropdownOption value="">None</DropdownOption>
          <DropdownOption value="Self">Self</DropdownOption>
          <DropdownOption value="Target">Target</DropdownOption>
        </Dropdown>
      </div>

      <hr />

      <div class="vertical-align">
        <label for="effectBypassBarrier_{id}_{index}">Bypass Barrier?</label>
        <input
          type="checkbox"
          bind:checked={effect.bypassBarrier}
          id="effectBypassBarrier_{id}_{index}"
          name="effectBypassBarrier_{id}_{index}"
        />
      </div>

      <hr />

      {#if effect.type === "single"}
        <label for="effectID_{id}_{index}"> Effect ID </label>
        <input
          bind:value={effect.effectID}
          id="effectID_{id}_{index}"
          name="effectID_{id}_{index}"
        />

        <h3>Initial Parameters</h3>

        <button
          onclick={() => {
            newParameter(effect);
          }}>New Parameter</button
        >

        <ul>
          {#each effect.initialParams as parameter}
            <li>
              <div class="vertical-align">
                <input bind:value={parameter.name} placeholder="Key" />:
                <input
                  bind:value={parameter.value}
                  type="number"
                  placeholder="Value"
                />
                <input
                  type="image"
                  src="{base}/delete.png"
                  alt="A bin"
                  onclick={() => {
                    deleteInitialParameter(effect, parameter);
                  }}
                />
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <label for="effectTableID_{id}_{index}">Table ID</label>
        <input
          bind:value={effect.tableID}
          id="effectTableID_{id}_{index}"
          name="effectTableID_{id}_{index}"
        />
      {/if}

      <br />

      <button
        class="red-button"
        onclick={() => {
          deleteEffect(effect);
        }}>Delete Effect</button
      >
    </li>
  {/each}
</ul>

<style lang="scss">
  @use "/src/styles/button.scss";
  @use "/src/styles/input.scss";
  @use "/src/styles/switch.scss";

  h3 {
    margin: 0;
  }

  button {
    & {
      @include button.button(#659ca7);
    }

    & {
      font-size: small !important;
      height: 1.5em !important;
    }
  }

  button.red-button {
    @include button.button(#b60000);
  }

  input[type="checkbox"] {
    @include switch.switch();
  }

  input[type="image"] {
    width: 1.5em;
    height: 1.5em;

    margin-left: 0.5ch;
  }

  .vertical-align {
    display: flex;
    align-items: center;
  }

  .z-index-1 {
    z-index: 1;
    position: relative;
  }

  input:not([type="image"]):not([type="checkbox"]) {
    @include input.input();
  }
</style>
