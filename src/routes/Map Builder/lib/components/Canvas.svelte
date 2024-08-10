<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { initialiseApp } from "../store/store";
  import initialisePIXIDevTools from "../canvas/initialisePIXIDevTools";
  import type { Application } from "pixi.js";

  let canvas: HTMLCanvasElement;
  let app: Application | null = null;

  onMount(async () => {
    const resizeTo = document.querySelector(".container") as HTMLElement | null;
    app = await initialiseApp({
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

  onDestroy(() => {
    if (app !== null) {
      app.destroy(
        {
          removeView: true,
        },
        {
          children: false,
          context: false,
          style: true,
          texture: false,
          textureSource: false,
        }
      );
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
