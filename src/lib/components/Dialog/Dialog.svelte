<script lang="ts">
  export let showDefaultCloseButton: boolean = true;

  export function open(): void {
    dialog.showModal();
  }

  export function close(): void {
    dialog.close();
  }

  export function toggle(): void {
    if (dialog.open) {
      close();
    } else {
      open();
    }
  }

  let dialog: HTMLDialogElement;
</script>

<dialog bind:this={dialog}>
  <slot />
  {#if showDefaultCloseButton}
    <br />
    <button on:click={close} disabled={false}>Close</button>
  {/if}
</dialog>

<style lang="scss">
  @import "/src/styles/button.scss";

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
      @include button;
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
