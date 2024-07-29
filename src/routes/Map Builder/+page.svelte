<svelte:head>
  <title>Map Builder</title>
</svelte:head>

<canvas />

<style lang="scss">
  @import "/src/styles/globals.scss";

  canvas {
    position: absolute;
    width: calc(100vw - $toolbar-width);
    height: calc(100vh - $navigation-bar-height);
    top: 0;
    left: 0;
    z-index: -999;
    background-color: black;
  }
</style>
