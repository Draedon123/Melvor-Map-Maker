<nav class="navigation">
  <slot />
</nav>

<style lang="scss">
  @import "/src/styles/globals.scss";

  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $navigation-bar-height;
    background-color: #1f1f1f;
    color: white;
    display: flex;
  }
</style>
