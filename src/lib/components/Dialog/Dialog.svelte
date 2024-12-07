<script lang="ts">
  type Props = {
    showDefaultCloseButton?: boolean;
    children?: import("svelte").Snippet;
  };

  let { showDefaultCloseButton = true, children }: Props = $props();

  export function open(): void {
    if (dialog === undefined) {
      return;
    }

    dialog.showModal();
  }

  export function close(): void {
    if (dialog === undefined) {
      return;
    }

    dialog.close();
  }

  export function toggle(): void {
    if (dialog === undefined) {
      return;
    }

    if (dialog.open) {
      close();
    } else {
      open();
    }
  }

  let dialog: HTMLDialogElement | undefined = $state();
</script>

<dialog bind:this={dialog}>
  {@render children?.()}
  {#if showDefaultCloseButton}
    <br />
    <button onclick={close}>Close</button>
  {/if}
</dialog>

<style lang="scss">
  @use "/src/styles/button.scss";

  dialog {
    border: none;
    width: max-content;
    height: max-content;
    padding: 0;
    z-index: 999;
    background-color: transparent;
    text-align: center;
    animation: fly-out-top 0.5s ease-in;
    pointer-events: all;

    &::backdrop {
      backdrop-filter: blur(4px);
    }

    &[open] {
      animation: fly-in-top 0.5s ease-out;
    }

    &:focus {
      outline-width: 0;
    }

    button {
      @include button.button;
    }
  }

  @keyframes fly-in-top {
    0% {
      transform: translateY(-100vh);
      display: none;
    }

    100% {
      transform: translateY(0);
      display: block;
    }
  }

  @keyframes fly-out-top {
    0% {
      transform: translateY(0);
      display: block;
    }

    100% {
      transform: translateY(-100vh);
      display: none;
    }
  }
</style>
