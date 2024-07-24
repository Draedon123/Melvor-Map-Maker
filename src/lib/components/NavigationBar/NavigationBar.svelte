<nav class="navigation">
  <slot />
</nav>

<style lang="scss">
  $navigation-bar-height: 3em;

  .navigation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: $navigation-bar-height;
    background-color: #1f1f1f;
    color: white;
    display: flex;
  }
</style>
