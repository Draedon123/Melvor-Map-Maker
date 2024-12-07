<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";

  type Props = {
    value?: number;
    containerStyles?: CSSObject;
    fillStyles?: CSSObject;
    ariaLabel?: string;
    easingFunction?: (time: number) => number;
  };

  let {
    value = $bindable(0),
    containerStyles = {},
    fillStyles = {},
    ariaLabel = "",
    easingFunction = cubicInOut,
  }: Props = $props();

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

  let containerStyleObject = $derived({
    "border-color": "black",
    ...containerStyles,
  } as CSSObject);
  let fillStyleObject = $derived({
    "background-color": "red",
    width: `${$progress * 100}%`,
    ...fillStyles,
  } as CSSObject);

  let containerStylesString = $derived(objectToCSS(containerStyleObject));
  let fillStylesString = $derived(objectToCSS(fillStyleObject));

  export { value, containerStyles, fillStyles, ariaLabel, easingFunction };
</script>

<div
  role="progressbar"
  class="container"
  style={containerStylesString}
  aria-label={ariaLabel}
>
  <div class="fill" style={fillStylesString}></div>
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
