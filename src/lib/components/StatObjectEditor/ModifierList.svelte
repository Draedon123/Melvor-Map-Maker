<script lang="ts">
  import helpTooltipRaw from "./ModifierListtooltip.md?raw";
  import { base } from "$app/paths";
  import { sticky } from "tippy.js";
  import { newTooltipAction } from "$lib/actions/tooltip";
  import type { Modifiers } from "./StatObjectEditor.svelte";
  import { marked } from "marked";

  export let modifiers: Modifiers = [];
  export let showHelpButton: boolean = false;

  const helpTooltipContent = marked(helpTooltipRaw) as string;

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

  function deleteModifier(modifier: Modifiers[number]): void {
    modifiers.splice(modifiers.indexOf(modifier), 1);

    modifiers = modifiers;
  }

  function deleteModifierValue(
    modifier: Modifiers[number],
    value: Modifiers[number]["values"][number]
  ): void {
    modifier.values.splice(modifier.values.indexOf(value), 1);

    modifiers = modifiers;
  }

  const helpTooltip = newTooltipAction({
    content: helpTooltipContent,
    trigger: "click",
    arrow: true,
    allowHTML: true,
    sticky: true,
    plugins: [sticky],
  });
</script>

<div class="vertical-align">
  <button on:click={newModifier}>New Modifier</button>
  {#if showHelpButton}
    <img
      src="{base}/question_mark.png"
      alt="A question mark"
      class="question"
      use:helpTooltip
    />
  {/if}
</div>
<ul>
  {#each modifiers as modifier}
    <li>
      <div class="vertical-align">
        <input
          bind:value={modifier.key}
          placeholder="Modifier Key"
          name="Modifier Key"
        />
        <input
          type="image"
          src="{base}/delete.png"
          alt="A bin"
          on:click={() => {
            deleteModifier(modifier);
          }}
        />
      </div>
      <ul class="less-indent">
        {#each modifier.values as value}
          <li class="no-list-dot vertical-align">
            <input
              bind:value={value.key}
              placeholder="Modifier-Value Key"
              name="Modifier-Value Key"
            />:
            <input
              bind:value={value.value}
              placeholder="Modifier-Value Value"
              name="Modifier-Value Value"
            />
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

    margin-left: 0.5ch;
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

  img.question {
    width: 1em;
    height: 1em;

    cursor: pointer;

    margin-left: 0.5ch;
  }
</style>
