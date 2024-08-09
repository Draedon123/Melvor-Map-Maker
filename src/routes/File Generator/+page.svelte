<script lang="ts">
  import "$lib/database/database";
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
        <button
          data-direction="back"
          disabled={disableAdvanceStageButtons ||
            activeStage === 1 ||
            (typeof canGoToNextStage === "string" && import.meta.env.PROD)}
          on:click|preventDefault={() => {
            advanceStage("back");
          }}>Back</button
        >
        <button
          data-direction="forward"
          disabled={disableAdvanceStageButtons ||
            activeStage === lastStage ||
            (typeof canGoToNextStage === "string" && import.meta.env.PROD)}
          on:click|preventDefault={() => {
            advanceStage("forward");
          }}>Next</button
        >
      </div>
    </div>
  </form>
</div>

<style lang="scss">
  @import "/src/styles/button.scss";

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

    button {
      @include button;
      @include button-disabled;

      & {
        width: 10ch;
        margin: 1ch;
      }
    }
  }

  .error {
    color: red;
  }
</style>
