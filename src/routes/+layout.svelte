<script>
  import { base } from "$app/paths";
  import NavigationBar from "$lib/components/NavigationBar/NavigationBar.svelte";
  import NavigationBarItem from "$lib/components/NavigationBar/NavigationBarItem.svelte";
  import "/src/styles/globals.scss";
</script>

<aside>
  <NavigationBar>
    <NavigationBarItem>
      <a href="{base}/">
        <input
          type="image"
          src="{base}/favicon.ico"
          alt="A yellow compass"
          class="navigation-bar-icon navigation-bar-item"
        />
      </a>
    </NavigationBarItem>
    <NavigationBarItem>
      <div class="navigation-bar-item">
        <a href="{base}/File%20Generator">File Generator</a>
      </div>
    </NavigationBarItem>
  </NavigationBar>
</aside>

<main>
  <slot />
</main>

<style lang="scss">
  @use "sass:math";
  @import "/src/styles/globals.scss";

  main {
    margin-top: $navigation-bar-height;
  }

  .navigation-bar-item {
    width: max-content;
    height: $navigation-bar-height;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    margin: 0 10ch;
    padding: 0 1ch;

    a {
      text-decoration: none;
      color: white;
      font-size: x-large;
      height: 100%;
      vertical-align: middle;
      display: flex;
      align-items: center;
    }

    &:last-child {
      margin-right: 1ch;
    }

    &:hover {
      background-color: #303030;
    }
  }

  input[type="image"].navigation-bar-icon {
    $dimensions: 0.9 * $navigation-bar-height;
    height: $dimensions;
    width: $dimensions;
    margin-top: math.div(($navigation-bar-height - $dimensions), 2);

    font-size: medium;
  }

  .navigation-bar-item.navigation-bar-icon {
    margin: 0;
    padding: 0;
  }
</style>
