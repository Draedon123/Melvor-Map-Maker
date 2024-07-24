<script lang="ts">
  import store from "./store";

  let modal: HTMLDialogElement;

  function previewImageOnClick(): void {
    if (modal.open) {
      modal.close();
    } else {
      modal.showModal();
    }
  }

  function closeDialog(): void {
    modal.close();
  }
</script>

<div class="container">
  <aside class="toolbar">
    <div>
      <input
        type="image"
        src="/preview.png"
        alt="A document and magnifying glass"
        title="Preview Image"
        on:click={previewImageOnClick}
      />
      <span>Preview Image</span>
    </div>
  </aside>

  <div class="fullscreen">
    <dialog bind:this={modal} class="modal">
      {#if $store.mapImage !== null}
        <img src={$store.mapImage.src} alt="Preview" />
        <br />
      {:else}
        <p class="no-image">No image inputted!</p>
      {/if}
      <button on:click={closeDialog}>Close</button>
    </dialog>
  </div>

  <div class="main">
    <slot />
  </div>
</div>

<style lang="scss">
  @use "sass:math";
  @import "/src/globals.scss";

  $toolbar-colour: #1f1f1f;
  $image-dimensions: 0.9 * $toolbar-width;

  .toolbar {
    position: absolute;
    background-color: $toolbar-colour;

    width: max-content;
    height: calc(100% + 1ch);

    left: calc(-1 * ($toolbar-width + 1ch));

    display: flex;
    align-items: center;
    flex-direction: column;

    &:hover div {
      background-color: #303030;
      width: 5 * $toolbar-width;

      span {
        opacity: 1;
      }
    }

    div {
      transition:
        background-color 0.4s ease,
        width 0.4s ease-in-out;
      width: $toolbar-width;
      position: relative;
      display: flex;
      align-items: center;
      overflow-x: hidden;
      cursor: pointer;

      input[type="image"] {
        width: $image-dimensions;
        height: $image-dimensions;
        font-size: medium;
        user-select: none;

        :focus {
          outline: none;
        }
      }

      span {
        opacity: 0;
        color: white;
        transition: opacity 0.4s;
        height: $image-dimensions / 2;
        text-wrap: nowrap;
      }
    }
  }

  .fullscreen {
    width: calc(100vw - $toolbar-width - 1ch);
    height: calc(100vh - $navigation-bar-height - 1ch);
    top: 0;
    left: 0;
    z-index: -999;
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  dialog.modal {
    border: none;
    width: max-content;
    height: max-content;
    padding: 0;
    background-color: transparent;
    text-align: center;

    img {
      max-width: 75vw;
      max-height: 75vh;
      margin: 0;
    }

    p.no-image {
      font-size: xx-large;
      user-select: none;
    }

    &::backdrop {
      backdrop-filter: blur(2px);
    }

    &[open] {
      animation: fly-in-top 0.5s ease-out;
    }
    animation: fly-out-top 0.5s ease-in;
  }

  .container {
    margin-left: $toolbar-width;
    margin-right: 0;
    position: relative;
    min-height: calc(100vh - $navigation-bar-height - 1ch);
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
