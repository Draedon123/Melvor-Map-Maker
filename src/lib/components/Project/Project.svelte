<script lang="ts">
  import { base } from "$app/paths";
  import { fromArrayBuffer } from "$lib/functions/imageUtils";
  import type { Project as IProject } from "$lib/database/database";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import database from "$lib/database/database";
  import store from "$routes/store";
  import Project from "$lib/classes/Project";

  export let project: IProject;

  let dialog: Dialog;
  let hasAttemptedDelete: boolean = false;

  async function deleteButtonOnClick(): Promise<void> {
    if (hasAttemptedDelete) {
      dialog.close();
      await database.projects.delete(project.id);

      if ($store.activeProject === project) {
        $store.activeProject = null;
      }

      return;
    }

    hasAttemptedDelete = true;
  }

  async function openButtonOnClick(): Promise<void> {
    $store.activeProject = await Project.fromDatabaseProject(project);
    dialog.close();
  }

  $: image = (() => {
    if (project.thumbnail !== null) {
      return fromArrayBuffer(project.thumbnail.buffer);
    }

    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();

      image.onload = () => {
        resolve(image);
      };

      image.src = `${base}/no_image.png`;
    });
  })();
</script>

<button
  class="project exclude-global"
  aria-label="Project: {project.name ?? 'Unnamed Project'}"
  on:click={() => {
    dialog.open();
  }}
>
  <h3>{project.name ?? "Unnamed Project"}</h3>
  {#await image}
    <p>Image loading...</p>
  {:then image}
    <img src={image.src} alt="Project thumbnail" class="thumbnail" />
  {/await}
  <!-- <div class="footer">asd</div> -->
</button>

<Dialog bind:this={dialog} showDefaultCloseButton={false}>
  <div class="dialog">
    <h1>{project.name ?? "Unnamed Project"}</h1>
    <button on:click={deleteButtonOnClick} class="delete-button">
      {!hasAttemptedDelete ? "Delete" : "Are you sure?"}
    </button>
    <button on:click={openButtonOnClick}>Open</button>
    <button on:click={dialog.close}>Close</button>
  </div>
</Dialog>

<style lang="scss">
  @import "/src/styles/button.scss";
  // $footer-height: 2em;

  button:not(.exclude-global) {
    @include button;
  }

  .dialog {
    width: max-content;
    height: max-content;

    background-color: #909090;
    border-radius: 2em;
    padding: 2ch;

    h1 {
      margin: 0 0 0.5em 0;
    }

    .delete-button {
      @include button(#ff0000);
    }
  }

  .project {
    cursor: pointer;

    width: min(100%, 225px);
    min-height: 200px;

    border: 1px solid #909090;
    border-radius: 1em;

    position: relative;
    text-align: center;

    display: flex;
    flex-direction: column;

    background-color: white;
    font-family: unset;

    &:hover {
      transition: scale 0.3s ease;
      scale: 1.1;
      z-index: 1;
    }

    h3 {
      margin: 0;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #909090;
      flex-grow: 1;
      width: 100%;
    }

    .thumbnail {
      width: 100%;
      aspect-ratio: 1;
    }

    // .footer {
    //   height: $footer-height;
    //   width: 100%;
    //   border-top: 1px solid #909090;
    // }
  }
</style>
