<script lang="ts">
  import type { PointData } from "$lib/melvor/schema";
  import interact from "interactjs";
  import { onMount } from "svelte";

  export let style: string = "";
  export let draggable: boolean = true;
  export let resizeable: boolean = true;
  export let resizeEdges: Interact.EdgeOptions = {
    top: true,
    left: true,
    bottom: true,
    right: true,
  };
  export let position: PointData = { x: 0, y: 0 };

  $: (() => {
    if (container !== undefined) {
      container.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  })();

  let container: HTMLDivElement;

  onMount(() => {
    interact(container)
      .draggable({
        inertia: true,
        listeners: {
          move(event: Interact.DragEvent) {
            if (!draggable) {
              return;
            }

            position.x += event.dx;
            position.y += event.dy;
          },
        },
      })
      .resizable({
        edges: resizeEdges,
        listeners: {
          move(event: Interact.ResizeEvent) {
            if (!resizeable) {
              return;
            }

            position.x += event.deltaRect?.left ?? 0;
            position.y += event.deltaRect?.top ?? 0;

            event.target.style.width = `${event.rect.width}px`;
            event.target.style.height = `${event.rect.height}px`;
            container.style.transform = `translate(${position.x}px, ${position.y}px)`;
          },
        },
      });
  });
</script>

<div bind:this={container} {style}>
  <slot />
</div>

<style lang="scss">
  div {
    width: max-content;
    height: max-content;

    position: absolute;
    z-index: 999;

    padding: 1em;
    border-radius: 1em;

    background-color: #4f4f4f;
    color: white;

    user-select: none;
    touch-action: none;
    box-sizing: border-box;
  }
</style>
