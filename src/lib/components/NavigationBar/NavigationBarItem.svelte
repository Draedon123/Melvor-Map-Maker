<div class="navigation-bar-item">
  <slot />
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
