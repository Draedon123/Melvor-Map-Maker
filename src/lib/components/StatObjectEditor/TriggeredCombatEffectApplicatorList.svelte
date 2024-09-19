<script lang="ts">
  import { base } from "$app/paths";
  import type { SingleCombatEffectApplicatorData } from "$lib/melvor/schema";
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";
  import EffectCondition from "./EffectCondition.svelte";
  import type { TriggeredData } from "./StatObjectEditor.svelte";

  export let effects: TriggeredData[] = [];

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

<button on:click={newEffect}>New Combat Effect</button>
<ul>
  {#each effects as effect}
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
        <label for="applyEffectWhenMerged">Apply Effect When Merged</label>
        <input
          type="checkbox"
          id="applyEffectWhenMerged"
          name="applyEffectWhenMerged"
          bind:checked={effect.applyEffectWhenMerged}
        />
      </div>

      <hr />

      <label for="effectCustomDescription">Custom Description:</label>
      <input
        bind:value={effect.customDescription}
        id="effectCustomDescription"
        name="effectCustomDescription"
      />

      <hr />

      <label for="effectDescriptionLanguageID"
        >Description Language String ID</label
      >
      <input
        bind:value={effect.descriptionLang}
        id="effectDescriptionLanguageID"
        name="effectDescriptionLanguageID"
      />

      <hr />

      <div class="vertical-align">
        <label for="effectIsNegative">Is negative</label>
        <input
          type="checkbox"
          id="effectIsNegative"
          name="effectIsNegative"
          bind:checked={effect.isNegative}
        />
      </div>

      <hr />

      <label for="effectChance">Chance:</label>
      <input
        bind:value={effect.chance}
        type="number"
        id="effectChance"
        name="effectChance"
        min="0"
        max="100"
      />

      <hr />

      Condition:
      <div class="dropdown">
        <EffectCondition bind:condition={effect.condition} />
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
        <label for="effectBypassBarrier">Bypass Barrier?</label>
        <input
          type="checkbox"
          bind:value={effect.bypassBarrier}
          id="effectBypassBarrier"
          name="effectBypassBarrier"
        />
      </div>

      <hr />

      {#if effect.type === "single"}
        <label for="effectID"> Effect ID </label>
        <input bind:value={effect.effectID} id="effectID" name="effectID" />

        <h3>Initial Parameters</h3>

        <button
          on:click={() => {
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
                  on:click={() => {
                    deleteInitialParameter(effect, parameter);
                  }}
                />
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <label for="effectTableID">Table ID</label>
        <input
          bind:value={effect.tableID}
          id="effectTableID"
          name="effectTableID"
        />
      {/if}

      <br />

      <button
        class="red-button"
        on:click={() => {
          deleteEffect(effect);
        }}>Delete Effect</button
      >
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "/src/styles/button.scss";
  @import "/src/styles/input.scss";
  @import "/src/styles/switch.scss";

  h3 {
    margin: 0;
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

  button.red-button {
    @include button(#b60000);
  }

  :global(.dropdown button) {
    background-color: #1f1f1f;
    z-index: 2;
  }

  input[type="checkbox"] {
    @include switch();
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
    @include input();
  }
</style>
