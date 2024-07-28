<script lang="ts">
  import HashManager from "$lib/classes/HashManager";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  let redirect: HTMLAnchorElement;

  onMount(() => {
    const hashManager = HashManager.fromWindow();
    const route = hashManager.get("route");
    if (route === null) {
      return;
    }

    redirect.href = `${base}/${route}`;
    redirect.click();
  });
</script>

<svelte:head>
  <title>Melvor Map Maker</title>
</svelte:head>

<h1>M3</h1>
<a href="/" bind:this={redirect}> </a>

<style lang="scss">
  a {
    display: none;
  }
</style>
