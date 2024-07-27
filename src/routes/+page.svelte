<script lang="ts">
  import HashManager from "$lib/classes/HashManager";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  let redirectLink: string = "";
  let redirect: HTMLAnchorElement;

  onMount(() => {
    const hashManager = HashManager.fromWindow();
    const route = hashManager.get("route");
    if (route === null) {
      return;
    }

    redirectLink = route;
    redirect.click();
  });
</script>

<h1>M3</h1>
<a href="{base}/{redirectLink}" bind:this={redirect}> </a>

<style lang="scss">
  a {
    display: none;
  }
</style>
