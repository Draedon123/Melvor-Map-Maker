<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { initialiseApp } from "./lib/store";
  import initialisePIXIDevTools from "./lib/initialisePIXIDevTools";
  import { Assets, Sprite } from "pixi.js";

  // const LOG_PREFIX = `Map Builder +page.svelte`;

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

    const texture = await Assets.load(`${base}/preview.png`);
    const sprite = Sprite.from(texture);
    sprite.label = "Hello World!";
    app.stage.children[0].addChild(sprite);
  });
</script>

<svelte:head>
  <title>Map Builder</title>
</svelte:head>

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
