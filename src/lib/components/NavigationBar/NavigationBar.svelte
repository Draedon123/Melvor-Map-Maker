<script lang="ts">
  type Props = {
    children: import("svelte").Snippet;
  };

  let { children }: Props = $props();
</script>

<nav class="navigation">
  {@render children?.()}
</nav>

<style lang="scss">
  @use "/src/styles/globals.scss";

  .navigation {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: globals.$navigation-bar-height;

    background-color: #1f1f1f;
    color: white;

    display: flex;
    z-index: 10;
  }
</style>
