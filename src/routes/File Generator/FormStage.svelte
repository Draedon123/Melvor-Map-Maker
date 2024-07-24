<script lang="ts">
  export let stage: number;
  export let currentStage: number;

  let container: HTMLDivElement;
  $: hidden = stage !== currentStage;
</script>

<div data-form-stage class:hidden bind:this={container}>
  <slot />
</div>

<style lang="scss">
  .hidden {
    opacity: 0;
    position: absolute;
    top: -9999px;
  }

  div {
    transition: opacity 0.5s;
  }
</style>
