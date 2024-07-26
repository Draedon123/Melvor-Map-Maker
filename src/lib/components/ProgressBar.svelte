<svelte:options accessors />

<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";

  export let value: number = 0;
  export let containerStyles: CSSObject = {};
  export let fillStyles: CSSObject = {};
  export let easingFunction: (time: number) => number = cubicInOut;

  export function set(value: number) {
    progress.set(value);
  }

  type CSSObject = Record<string, string | number>;

  function objectToCSS(object: CSSObject): string {
    let cssString = "";
    const entries = Object.entries(object);

    for (const [key, value] of entries) {
      cssString += `${key}: ${value};`;
    }

    return cssString;
  }

  const progress = tweened(value, {
    easing: easingFunction,
  });

  progress.subscribe((percent) => {
    value = percent;
  });

  $: containerStyleObject = {
    "border-color": "black",
    ...containerStyles,
  } as CSSObject;
  $: fillStyleObject = {
    "background-color": "red",
    width: `${$progress * 100}%`,
    ...fillStyles,
  } as CSSObject;

  $: containerStylesString = objectToCSS(containerStyleObject);
  $: fillStylesString = objectToCSS(fillStyleObject);
</script>

<div role="progressbar" class="container" style={containerStylesString}>
  <div class="fill" style={fillStylesString} />
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    border: 1px solid;
    border-radius: 1000em;
    overflow: hidden;
  }

  .fill {
    width: 0;
    height: 100%;
  }
</style>
