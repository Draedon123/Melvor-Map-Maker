<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { initialiseApp } from "../store/store";
  import initialisePIXIDevTools from "../canvas/initialisePIXIDevTools";
  import type { Application } from "pixi.js";

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let app: Application | null = null;

  onMount(async () => {
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
  <canvas bind:this={canvas} />
</div>

<style lang="scss">
  .container {
    height: 100%;
    min-width: calc(100% - 25vw);
  }

  canvas {
    width: 100%;
    height: 100%;

    background-color: black;

    flex-shrink: 0;
    flex-grow: 1;
  }
</style>
