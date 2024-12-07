<script lang="ts">
  type Props = {
    stage: number;
    currentStage: number;
    children?: import("svelte").Snippet;
  };

  let { stage, currentStage, children }: Props = $props();

  let hidden = $derived(stage !== currentStage);
</script>

<div data-form-stage class:hidden>
  {@render children?.()}
</div>

<style lang="scss">
  .hidden {
    opacity: 0;
    position: absolute;
    top: -9999px;
    display: unset !important;
  }

  div {
    transition: opacity 0.5s;
  }
</style>
