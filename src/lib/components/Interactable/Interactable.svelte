<script lang="ts">
  import interact from "interactjs";
  import { onMount } from "svelte";
  import type { PointData } from "$lib/melvor/schema";

  type Props = {
    style?: string;
    draggable?: boolean;
    resizeable?: boolean;
    resizeEdges?: Interact.EdgeOptions;
    position?: PointData;
    children?: import("svelte").Snippet;
  };

  let {
    style = "",
    draggable = false,
    resizeable = false,
    resizeEdges = {
      top: true,
      left: true,
      bottom: true,
      right: true,
    },
    position = $bindable({ x: 0, y: 0 }),
    children,
  }: Props = $props();

  let container: HTMLDivElement | undefined = $state();

  onMount(() => {
    if (container === undefined) {
      throw new Error("[Interactable] | wtf");
    }

    interact(container)
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: document.body,
            endOnly: true,
          }),
        ],
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
          },
        },
      });
  });
  $effect(() => {
    if (container !== undefined) {
      container.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  });
</script>

<div bind:this={container} {style}>
  {@render children?.()}
</div>

<style lang="scss">
  @use "/src/styles/scrollbar.scss";

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

    overflow: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
