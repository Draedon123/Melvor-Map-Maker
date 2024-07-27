<script lang="ts">
  import { onMount } from "svelte";

  const redirects: Map<RegExp, string> = new Map([
    [/^\/file ?generator$/i, encodeURIComponent("File Generator")],
  ]);

  onMount(() => {
    const pathname = window.location.pathname.replace(
      /^\/Melvor-Map-Maker\//,
      "/"
    );
    for (const [regex, redirect] of redirects.entries()) {
      if (regex.test(pathname)) {
        window.location.pathname =
          import.meta.env.PROD && window.location.host.includes("github")
            ? `/Melvor-Map-Maker/${redirect}`
            : `/${redirect}`;
      }
    }
  });
</script>

<svelte:head>
  <title>Page Not Found</title>
</svelte:head>

<div class="container">
  <h1>Error: 404</h1>
  <p>
    To navigate back to the home page, click the icon in the top left corner of
    the page
  </p>
</div>

<style lang="scss">
  .container {
    text-align: center;
  }
</style>
