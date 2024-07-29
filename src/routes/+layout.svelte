<script>
  import { base } from "$app/paths";
  import { PUBLIC_VERSION } from "$env/static/public";
  import NavigationBar from "$lib/components/NavigationBar/NavigationBar.svelte";
  import NavigationBarItem from "$lib/components/NavigationBar/NavigationBarItem.svelte";
  import "/src/styles/globals.scss";

  console.clear();
  console.log(`App Version: ${PUBLIC_VERSION}`);
</script>

<svelte:head>
  <meta
    name="description"
    content="A friendly and accessible interface to create custom maps for the Cartography Skill in Melvor Idle"
  />
  <meta name="keywords" content="Melvor, Melvor Idle, Cartography, Map Maker" />
  <meta name="author" content="Draedon" />
  <meta name="theme-color" content="#EE9A5A" />

  <meta property="og:title" content="Melvor Map Maker" />
  <meta
    property="og:description"
    content="A friendly and accessible web interface for creating custom maps for the Cartography Skill in Melvor Idle"
  />
  <meta property="og:determiner" content="" />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:locale:alternate" content="en_US" />
  <meta
    property="og:url"
    content="https://draedon123.github.io/Melvor-Idle-Map-Maker/"
  />
  <meta property="og:image" content="https://i.imgur.com/IFYXatu.png" />
  <meta
    property="og:image:secure_url"
    content="https://i.imgur.com/IFYXatu.png"
  />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1000" />
  <meta property="og:image:height" content="1000" />
  <meta property="og:image:alt" content="The Melvor Idle map" />
  <meta property="og:type" content="website" />

  <style>
    body {
      margin: 0;
    }
  </style>
</svelte:head>

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
    <NavigationBarItem>
      <div class="navigation-bar-item">
        <a href="{base}/Map%20Builder">Map Builder</a>
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
