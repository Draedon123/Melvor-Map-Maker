<script lang="ts">
  import { base } from "$app/paths";
  import resizeImage from "$lib/functions/imageResize";
  import store from "./store";

  let modal: HTMLDialogElement;
  let preview: HTMLImageElement;
  let previewImageSRC: string = `${base}/black.png`;

  function previewImageOnClick(): void {
    if (modal.open) {
      modal.close();
    } else {
      modal.showModal();
    }
  }

  async function getPreviewImageSrc(
    image: HTMLImageElement | null
  ): Promise<void> {
    URL.revokeObjectURL(previewImageSRC);
    if (image === null) {
      previewImageSRC = `${base}/black.png`;
      return;
    }

    const width = document.body.offsetHeight * 0.75 * devicePixelRatio;
    const height = document.body.offsetHeight * 0.75 * devicePixelRatio;

    const src = await resizeImage(
      image,
      {
        type: "to",
        x: width,
        y: height,
      },
      "url"
    );

    previewImageSRC = src;
  }

  function closeDialog(): void {
    modal.close();
  }

  store.subscribe((store) => {
    getPreviewImageSrc(store.mapImage);
  });
</script>

<div class="container">
  <aside class="toolbar">
    <div>
      <input
        type="image"
        src="{base}/preview.png"
        alt="A document and magnifying glass"
        title="Preview Image"
        on:click={previewImageOnClick}
      />
      <span>Preview Image</span>
    </div>
  </aside>

  <dialog bind:this={modal} class="modal">
    <img bind:this={preview} src={previewImageSRC} alt="Preview" />
    <br />
    <button on:click={closeDialog}>Close</button>
  </dialog>

  <div class="main">
    <slot />
  </div>
</div>

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
  @use "sass:math";
  @import "/src/styles/globals.scss";
  @import "/src/styles/button.scss";

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
      width: 4 * $toolbar-width;

      &:hover {
        background-color: #303030;
      }

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
        height: math.div($image-dimensions, 2);
        text-wrap: nowrap;
      }
    }
  }

  dialog.modal {
    border: none;
    width: max-content;
    height: max-content;
    padding: 0;
    background-color: transparent;
    text-align: center;
    animation: fly-out-top 0.5s ease-in;
    pointer-events: all;

    img {
      width: 75vh;
      height: 75vh;
      background-color: black;
      margin: 0;
    }

    &::backdrop {
      backdrop-filter: blur(4px);
    }

    &[open] {
      animation: fly-in-top 0.5s ease-out;
    }
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
