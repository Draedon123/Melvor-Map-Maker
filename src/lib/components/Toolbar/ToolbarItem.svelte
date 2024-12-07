<script lang="ts">
  type Props = {
    imageSRC: string;
    imageAltText: string;
    onClick?: () => void;
    children?: import("svelte").Snippet;
  };

  let {
    imageSRC,
    imageAltText,
    onClick = () => {},
    children,
  }: Props = $props();
</script>

<button onclick={onClick}>
  <img src={imageSRC} alt={imageAltText} />
  <span>
    {@render children?.()}
  </span>
</button>

<style lang="scss">
  @use "sass:math";
  @use "/src/styles/globals.scss";

  $toolbar-colour: #1f1f1f;
  $image-dimensions: 0.9 * globals.$toolbar-width;

  button {
    width: globals.$toolbar-width;

    position: relative;
    display: flex;
    align-items: center;

    padding: 0;
    border: none;
    background-color: transparent;

    overflow-x: hidden;
    transition:
      background-color 0.4s ease,
      width 0.4s ease-in-out;
    font-size: medium;
    cursor: pointer;

    img {
      width: $image-dimensions;
      height: $image-dimensions;

      font-size: medium;
      user-select: none;
      padding-right: calc(100% - $image-dimensions);

      &:focus {
        outline: none;
      }
    }

    span {
      height: math.div($image-dimensions, 2);

      opacity: 0;
      transition: opacity 0.4s;

      color: white;
      text-wrap: nowrap;
      font-family: auto;

      position: absolute;
      left: calc($image-dimensions + 0.5ch);

      padding-right: 1ch;
    }
  }
</style>
