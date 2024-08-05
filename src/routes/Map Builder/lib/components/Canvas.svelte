<script lang="ts">
  import { onMount } from "svelte";
  import { initialiseApp } from "../store/store";
  import initialisePIXIDevTools from "../canvas/initialisePIXIDevTools";

  let canvas: HTMLCanvasElement;

  onMount(async () => {
    const resizeTo = document.querySelector(".container") as HTMLElement | null;
    const app = await initialiseApp({
      canvas,
      appOptions: {
        resizeTo: resizeTo ?? undefined,
        resolution: window.devicePixelRatio ?? 1.5,
      },
      viewportOptions: {
        constructorOptions: {
          passiveWheel: false,
        },
        pluginOptions: {
          decelerateOptions: {
            minSpeed: 0.3,
            friction: 0.96,
          },
          wheelOptions: {
            percent: 10,
          },
        },
      },
    });

    if (import.meta.env.DEV) {
      initialisePIXIDevTools(app);
    }
  });
</script>

<canvas bind:this={canvas} />

<style lang="scss">
  @import "/src/styles/globals.scss";

  canvas {
    position: absolute;
    width: calc(100vw - $toolbar-width);
    height: calc(100vh - $navigation-bar-height);
    top: 0;
    left: 0;
    z-index: 1;
    background-color: black;
  }
</style>
