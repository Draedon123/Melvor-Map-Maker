<script lang="ts">
  type Props = {
    children: import("svelte").Snippet;
  };

  let { children }: Props = $props();
</script>

<div class="navigation-bar-item">
  {@render children?.()}
</div>

<style lang="scss">
  .navigation-bar-item {
    display: inline-block;
    height: 100%;
  }

  .navigation-bar-item:first-child {
    margin-right: auto;
  }
</style>
