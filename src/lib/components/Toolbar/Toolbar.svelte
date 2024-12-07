<script lang="ts">
  type Props = {
    children: import("svelte").Snippet;
  };

  let { children }: Props = $props();
</script>

<aside class="toolbar">
  {@render children?.()}
</aside>

<style lang="scss">
  @use "sass:math";
  @use "/src/styles/globals.scss";

  $toolbar-colour: #1f1f1f;

  .toolbar {
    position: fixed;
    background-color: $toolbar-colour;

    width: max-content;
    height: 100%;

    left: 0;

    display: flex;
    align-items: center;
    flex-direction: column;

    z-index: 10;
  }

  :global(.toolbar:hover button) {
    width: 4 * globals.$toolbar-width !important;

    &:hover {
      background-color: #303030;
    }

    :global(span) {
      opacity: 1 !important;
    }
  }
</style>
