<script lang="ts">
  import Error404 from "$lib/components/errors/404.svelte";
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Error: {$page.status}</title>
</svelte:head>

{#if $page.status === 404}
  <Error404 />
{:else}
  <div class="container">
    <h1>Error: {$page.status}</h1>
    <p>{$page.error?.message}</p>
  </div>
{/if}

<style lang="scss">
  .container {
    text-align: center;
  }
</style>
