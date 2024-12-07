<script lang="ts">
  import initialisePIXIDevTools from "../canvas/initialisePIXIDevTools";
  import { initialiseApp } from "../store/store";
  import { onDestroy, onMount } from "svelte";
  import type { Application } from "pixi.js";

  let container: HTMLDivElement | undefined = $state();
  let canvas: HTMLCanvasElement | undefined = $state();
  let app: Application | null = null;

  onMount(async () => {
    if (canvas === undefined) {
      return;
    }

    app = await initialiseApp({
      canvas,
      appOptions: {
        resizeTo: container,
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

<div bind:this={container} class="container">
  <canvas bind:this={canvas}></canvas>
</div>

<style lang="scss">
  .container {
    height: 100%;
    width: calc(100% - 25vw);
  }

  canvas {
    width: 100%;
    height: 100%;

    background-color: black;

    flex-shrink: 0;
    flex-grow: 1;
  }
</style>
