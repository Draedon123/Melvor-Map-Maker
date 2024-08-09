<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { PUBLIC_VERSION } from "$env/static/public";
  import store from "./store";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Toastify from "toastify-js";
  import NavigationBar from "$lib/components/NavigationBar/NavigationBar.svelte";
  import KeyboardShortcut from "$lib/classes/KeyboardShortcut";
  import NavigationBarItem from "$lib/components/NavigationBar/NavigationBarItem.svelte";
  import "/src/styles/globals.scss";
  import "toastify-js/src/toastify.css";
  import Project from "$lib/classes/Project";

  console.clear();
  console.log(`App Version: ${PUBLIC_VERSION}`);

  let newProjectModal: Dialog;
  let projectName: string = "Unnamed Project";

  async function createProjectButtonOnClick(): Promise<void> {
    const project = new Project({
      name: projectName,
    });

    await project.save();

    newProjectModal.close();
  }

  onMount(() => {
    new KeyboardShortcut(
      async (event) => {
        event.preventDefault();

        if ($store.activeProject === null) {
          return;
        }

        await $store.activeProject?.save();

        Toastify({
          duration: 3000,
          text: `Project ${$store.activeProject?.name} saved`,
          close: true,
          gravity: "bottom",
          position: "center",
        }).showToast();
      },
      {
        key: "s",
        modifiers: ["CTRL"],
      }
    );

    new KeyboardShortcut(
      (event) => {
        event.preventDefault();
        console.log(event);
        projectName = "Unnamed Project";
        newProjectModal.open();
      },
      {
        key: "k",
        modifiers: ["CTRL"],
      }
    );
  });
</script>

<svelte:head>
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

<Dialog bind:this={newProjectModal} showDefaultCloseButton={false}>
  <div class="modal-container">
    <h1>Create New Project</h1>
    <label for="projectName">
      Project Name: <input
        name="projectName"
        id="projectName"
        placeholder="Unnamed Project"
        class:invalid={projectName === ""}
        bind:value={projectName}
      />
    </label>

    <button
      on:click={createProjectButtonOnClick}
      disabled={projectName === ""}
      class="create-project">Create Project</button
    >
    <button on:click={() => newProjectModal.close()}>Close</button>
  </div>
</Dialog>

<main>
  <slot />
</main>

<style lang="scss">
  @use "sass:math";
  @import "/src/styles/globals.scss";
  @import "/src/styles/input.scss";
  @import "/src/styles/button.scss";

  .modal-container {
    background-color: #909090;

    padding: 0.5em 1em;

    border-radius: 1em;

    h1 {
      margin: 0;
      margin-bottom: 0.5em;
    }

    label {
      display: flex;
      align-items: center;

      font-size: large;

      > input {
        margin-left: 0.5ch;
      }
    }

    .create-project {
      @include button(#44cc44);
      @include button-disabled(#44cc44);
    }

    input {
      @include input;

      & {
        margin: 0.25em 0;
      }
    }

    button {
      @include button;
    }
  }

  input.invalid {
    border-color: #ff0000 !important;
    outline-width: 0;
  }

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
