<script lang="ts">
  import "$lib/workers/cacheDatabase";
  import { onMount } from "svelte";
  import clamp from "$lib/functions/clamp";
  import StageOne from "./Form Stages/StageOne.svelte";
  import StageTwo from "./Form Stages/StageTwo.svelte";
  import StageThree from "./Form Stages/StageThree.svelte";

  const STAGE_COMPLETION: Record<number, () => true | string> = {};

  let form: HTMLFormElement;
  let activeStage: number = 1;
  let lastStage: number = 1;
  let disableAdvanceStageButtons: boolean = false;
  let stageOne: StageOne;
  let stageTwo: StageTwo;

  let canGoToNextStage = STAGE_COMPLETION[activeStage]?.() ?? true;

  function advanceStage(direction: "back" | "forward"): void {
    canGoToNextStage = STAGE_COMPLETION[activeStage]?.() ?? true;
    if (typeof canGoToNextStage === "string" && import.meta.env.PROD) {
      return;
    }

    activeStage = clamp(
      activeStage + (direction === "back" ? -1 : 1),
      1,
      lastStage
    );

    canGoToNextStage = STAGE_COMPLETION[activeStage]?.() ?? true;
  }

  onMount(() => {
    const formStages = [...form.children].filter(
      (child) => child.getAttribute("data-form-stage") !== null
    );

    let lastIndex = formStages.length;
    lastStage = lastIndex;

    for (let i = 0; i < lastIndex; i++) {
      const child = formStages[i];
      child.setAttribute("data-stage", i.toString());
    }

    STAGE_COMPLETION[1] = stageOne.isStageComplete;
    STAGE_COMPLETION[2] = stageTwo.isStageComplete;
    canGoToNextStage = STAGE_COMPLETION[activeStage]?.() ?? true;
  });
</script>

<svelte:head>
  <title>File Generator</title>
</svelte:head>

<div class="form-container">
  <form
    class="scrolling-form"
    name="fileGeneratorForm"
    id="fileGeneratorForm"
    on:submit|preventDefault
    bind:this={form}
  >
    <StageOne
      bind:this={stageOne}
      {activeStage}
      bind:canGoToNextStage
      bind:disableAdvanceStageButtons
    />
    <StageTwo bind:this={stageTwo} {activeStage} bind:canGoToNextStage />
    <StageThree {activeStage} />
    <div class="submit">
      <div class="error">
        {#if typeof canGoToNextStage === "string"}
          {canGoToNextStage}
        {/if}
      </div>
      <div class="submit-button-container">
        <input
          type="submit"
          data-direction="back"
          value="Back"
          disabled={disableAdvanceStageButtons ||
            activeStage === 1 ||
            (typeof canGoToNextStage === "string" && import.meta.env.PROD)}
          on:click|preventDefault={() => {
            advanceStage("back");
          }}
        />
        <input
          type="submit"
          data-direction="forward"
          value="Next"
          disabled={disableAdvanceStageButtons ||
            activeStage === lastStage ||
            (typeof canGoToNextStage === "string" && import.meta.env.PROD)}
          on:click|preventDefault={() => {
            advanceStage("forward");
          }}
        />
      </div>
    </div>
  </form>
</div>

<style lang="scss">
  .form-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: xx-large;
  }

  .submit {
    margin-top: 0.5em;
    text-align: center;
  }

  .submit-button-container {
    display: flex;
    justify-content: center;

    $input-background-colour: #3333dd;
    $input-border-colour: color-mix(
      in srgb,
      $input-background-colour 90%,
      #000000 10%
    );

    input {
      background-color: $input-background-colour;
      border: 2px solid $input-border-colour;
      border-radius: 3em;

      width: 10ch;
      height: 3em;
      font-size: large;

      margin: 1ch;
      cursor: pointer;
      color: #ffffff;
      transition:
        background-color 0.3s,
        border-color 0.3s;

      &[disabled] {
        cursor: not-allowed;
      }

      &:hover:not([disabled]),
      &[disabled] {
        background-color: color-mix(
          in srgb,
          $input-background-colour 85%,
          #000000 15%
        );
        border-color: color-mix(in srgb, $input-border-colour 85%, #000000 15%);
      }
    }
  }

  .error {
    color: red;
  }
</style>
