<script lang="ts">
  import HashManager from "$lib/classes/HashManager";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  onMount(() => {
    const hashManager = HashManager.fromWindow();
    const route = hashManager.get("route");
    if (route === null) {
      return;
    }

    window.location.pathname = `${base}/${route}`;
  });
</script>

<h1>M3</h1>
