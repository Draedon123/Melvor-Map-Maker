<script lang="ts">
  export let imageSRC: string;
  export let imageAltText: string;
  export let imageOnClick: () => void = () => {};
</script>

<div>
  <input
    type="image"
    src={imageSRC}
    alt={imageAltText}
    on:click={imageOnClick}
  />
  <span>
    <slot />
  </span>
</div>

<style lang="scss">
  @use "sass:math";
  @import "/src/styles/globals.scss";

  $toolbar-colour: #1f1f1f;
  $image-dimensions: 0.9 * $toolbar-width;

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
      padding-right: calc(100% - $image-dimensions);

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
      position: absolute;
      left: calc($image-dimensions + 0.5ch);
    }
  }
</style>
