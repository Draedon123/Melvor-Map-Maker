<script lang="ts" context="module">
  type DropdownContext = {
    setValue: (value: string) => void;
    setTextContext: (textContent: string) => void;
    hide: () => void;
    onChange: (value: string) => void;
  };

  export type { DropdownContext };
</script>

<script lang="ts">
  import { setContext } from "svelte";

  export let placeholder: string = "";
  export let value: string = "";
  export let caretFillColour: string = "#000000";
  export let style: string = "";
  export let showOptions: boolean = false;
  export let height: number = 10;
  export let onChange: (value: string) => void = () => {};

  let textContent: string = value;

  setContext<DropdownContext>("dropdown", {
    hide: () => {
      showOptions = false;
    },
    setValue(newValue: string) {
      value = newValue;
    },
    setTextContext(newTextContent: string) {
      textContent = newTextContent;
    },
    onChange,
  });

  function buttonOnClick(): void {
    showOptions = !showOptions;
  }
</script>

<div class="container">
  <button {style} on:click|stopPropagation={buttonOnClick}>
    {textContent ? textContent : placeholder}
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class:vertical-flip={showOptions}
    >
      <!-- https://www.svgrepo.com/svg/309421/chevron-down -->
      <path
        d="M8.36612 16.1161C7.87796 16.6043 7.87796 17.3957 8.36612 17.8839L23.1161 32.6339C23.6043 33.122 24.3957 33.122 24.8839 32.6339L39.6339 17.8839C40.122 17.3957 40.122 16.6043 39.6339 16.1161C39.1457 15.628 38.3543 15.628 37.8661 16.1161L24 29.9822L10.1339 16.1161C9.64573 15.628 8.85427 15.628 8.36612 16.1161Z"
        fill={caretFillColour}
      />
    </svg>
  </button>

  <div
    class="optionContainer"
    class:hidden={!showOptions}
    style="max-height: {height}em;"
  >
    <slot />
  </div>
</div>

<style lang="scss">
  @import "/src/styles/button.scss";
  @import "/src/styles/scrollbar.scss";

  .container {
    position: relative;
    width: 100%;
  }

  button {
    @include button(#4f4f4f);

    & {
      height: 1.75em;
      width: 100%;

      padding: 5px;

      display: flex;
      align-items: center;

      border-radius: 0;

      text-align: left;
    }
  }

  svg {
    width: 1.5em;
    height: 1.5em;

    margin-left: auto;
  }

  .vertical-flip {
    rotate: 180deg;
  }

  .optionContainer {
    display: flex;
    flex-direction: column;

    background-color: #4f4f4f;
    position: absolute;

    width: 100%;
    overflow-y: scroll;

    font-size: small;

    @include scrollbar(#4f4f4f, #7f7f7f);
  }
</style>
