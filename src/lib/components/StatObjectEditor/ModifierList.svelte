<script lang="ts">
  import { base } from "$app/paths";
  import type { Modifiers } from "./StatObjectEditor.svelte";

  export let modifiers: Modifiers = [];

  function newModifier(): void {
    modifiers.push({
      key: "",
      values: [
        {
          key: "",
          value: "",
        },
      ],
    });

    modifiers = modifiers;
  }

  function newModifierValue(modifier: Modifiers[number]): void {
    modifier.values.push({
      key: "",
      value: "",
    });

    modifiers = modifiers;
  }

  function deleteModifierValue(
    modifier: Modifiers[number],
    value: Modifiers[number]["values"][number]
  ): void {
    modifier.values.splice(modifier.values.indexOf(value), 1);

    modifiers = modifiers;
  }
</script>

<button on:click={newModifier}>New Modifier</button>
<ul>
  {#each modifiers as modifier}
    <li>
      <div class="vertical-align">
        <input bind:value={modifier.key} placeholder="Modifier Key" />
      </div>
      <ul class="less-indent">
        {#each modifier.values as value}
          <li class="no-list-dot vertical-align">
            <input bind:value={value.key} placeholder="Key" />:
            <input bind:value={value.value} placeholder="Value" />
            <input
              type="image"
              src="{base}/delete.png"
              alt="A bin"
              on:click={() => {
                deleteModifierValue(modifier, value);
              }}
            />
          </li>
        {/each}
        <li class="no-list-dot">
          <button
            on:click={() => {
              newModifierValue(modifier);
            }}>New Modifier Value</button
          >
        </li>
      </ul>
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "/src/styles/input.scss";
  @import "/src/styles/button.scss";

  .no-list-dot {
    list-style: none;
  }

  .less-indent {
    padding-inline-start: 2ch;
  }

  input:not([type="image"]) {
    & {
      @include input();
    }

    & {
      font-size: small;
    }
  }

  input[type="image"] {
    width: 1.5em;
    height: 1.5em;
  }

  button {
    & {
      @include button(#659ca7);
    }

    & {
      font-size: small;
      height: 1.5em;
      margin-top: 3px;
    }
  }

  .vertical-align {
    display: flex;
    align-items: center;
  }
</style>
