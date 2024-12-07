<script lang="ts">
  import Project from "$lib/components/Project/Project.svelte";
  import database from "$lib/database/database";
  import HashManager from "$lib/classes/HashManager";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { liveQuery } from "dexie";

  let redirect: HTMLAnchorElement | undefined = $state();
  let projects = liveQuery(() => database.projects.toArray());

  onMount(() => {
    if (redirect === undefined) {
      return;
    }

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

  <style lang="scss">
    body {
      margin: 0;
      overflow: hidden;

      min-width: 100vw;
      min-height: 100vh;
    }
  </style>
</svelte:head>

<h1>Melvor Map Maker</h1>
<!-- svelte-ignore a11y_consider_explicit_label -->
<a href={base} bind:this={redirect}> </a>

<div class="projects">
  <h2>Saved Projects</h2>
  <div class="project-container">
    {#if $projects !== undefined}
      {#if $projects.length > 0}
        {#each $projects as project (project.id)}
          <Project {project} />
        {/each}
      {:else}
        <h3>
          No existing projects! Create a new project with CTRL + K! An actual
          interface is coming Soon™️
        </h3>
      {/if}
    {:else}
      <p>Loading projects...</p>
    {/if}
  </div>
</div>

<style lang="scss">
  h1,
  h3 {
    text-align: center;
    margin: 0;
  }

  a {
    display: none;
  }

  .projects {
    display: flex;
    align-items: center;
    flex-direction: column;

    margin-bottom: 2em;

    .project-container {
      border: 1px solid #909090;
      border-radius: 1em;
      padding: 1ch;

      width: 80%;
      min-height: 200px;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1ch;
    }
  }
</style>
