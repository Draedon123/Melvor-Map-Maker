<script lang="ts">
  import { dev } from "$app/environment";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { PUBLIC_VERSION } from "$env/static/public";
  import store from "./store";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Project from "$lib/classes/Project";
  import Toastify from "toastify-js";
  import NavigationBar from "$lib/components/NavigationBar/NavigationBar.svelte";
  import KeyboardShortcut from "$lib/classes/KeyboardShortcut";
  import StatObjectEditor from "$lib/components/StatObjectEditor/StatObjectEditor.svelte";
  import NavigationBarItem from "$lib/components/NavigationBar/NavigationBarItem.svelte";
  import "tippy.js/dist/tippy.css";
  import "/src/styles/globals.scss";
  import "toastify-js/src/toastify.css";

  console.clear();
  console.log(`App Version: ${PUBLIC_VERSION}`);

  let newProjectModal: Dialog;
  let projectName: string = "Unnamed Project";

  async function createProjectButtonOnClick(): Promise<void> {
    const project = new Project({
      name: projectName,
    });

    await project.save();
    $store.activeProject = project;

    newProjectModal.close();
  }

  onMount(() => {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register(`${base}/service-worker.js`, {
        type: dev ? "module" : "classic",
        scope: `${base}/`,
      });
    }

    new KeyboardShortcut(
      async (event) => {
        event.preventDefault();

        if ($store.activeProject === null) {
          newProjectModal.open();
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
  <style lang="scss">
    body {
      height: 100vh;
      width: 100vw;

      margin: 0;
      position: absolute;

      overflow: hidden;
      background-color: unset !important;
    }

    .tippy-box {
      max-width: 45vw;
      max-height: 45vh;

      overflow: scroll;

      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  </style>
</svelte:head>

<StatObjectEditor />

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

<!-- #region Datalists -->
<datalist id="skillIDs">
  <option value="melvorD:Attack" />
  <option value="melvorD:Strength" />
  <option value="melvorD:Defence" />
  <option value="melvorD:Hitpoints" />
  <option value="melvorD:Ranged" />
  <option value="melvorD:Magic" />
  <option value="melvorD:Prayer" />
  <option value="melvorD:Slayer" />
  <option value="melvorD:Woodcutting" />
  <option value="melvorD:Fishing" />
  <option value="melvorD:Firemaking" />
  <option value="melvorD:Cooking" />
  <option value="melvorD:Mining" />
  <option value="melvorD:Smithing" />
  <option value="melvorD:Thieving" />
  <option value="melvorD:Farming" />
  <option value="melvorD:Fletching" />
  <option value="melvorD:Crafting" />
  <option value="melvorD:Runecrafting" />
  <option value="melvorD:Herblore" />
  <option value="melvorD:Agility" />
  <option value="melvorD:Summoning" />
  <option value="melvorD:Astrology" />
  <option value="melvorD:Township" />
  <option value="melvorAoD:Cartography" />
  <option value="melvorAoD:Archaeology" />
  <option value="melvorItA:Harvesting" />
  <option value="melvorItA:Corruption" />
</datalist>

<datalist id="namespaces">
  <option value="melvorBaseGame" />
  <option value="melvorTrue" />
  <option value="melvorD" />
  <option value="melvorF" />
  <option value="melvorTotH" />
  <option value="melvorAoD" />
  <option value="melvorItA" />
  <option value="melvorBirthday2023" />
  <option value="melvorAprilFools2024" />
</datalist>

<datalist id="dungeonIDs">
  <option value="melvorD:Chicken_Coop" />
  <option value="melvorD:Undead_Graveyard" />
  <option value="melvorD:Spider_Forest" />
  <option value="melvorD:Frozen_Cove" />
  <option value="melvorD:Deep_Sea_Ship" />
  <option value="melvorD:Volcanic_Cave" />
  <option value="melvorD:Bandit_Base" />
  <option value="melvorD:Hall_of_Wizards" />
  <option value="melvorF:Air_God_Dungeon" />
  <option value="melvorF:Water_God_Dungeon" />
  <option value="melvorF:Earth_God_Dungeon" />
  <option value="melvorF:Fire_God_Dungeon" />
  <option value="melvorF:Dragons_Den" />
  <option value="melvorF:Miolite_Caves" />
  <option value="melvorF:Infernal_Stronghold"
    >melvorF:Infernal_Stronghold</option
  >
  <option value="melvorF:Into_the_Mist">melvorF:Into_the_Mist</option>
  <option value="melvorF:Impending_Darkness">melvorF:Impending_Darkness</option>
  <option value="melvorTotH:Ancient_Sanctuary"
    >melvorTotH:Ancient_Sanctuary</option
  >
  <option value="melvorTotH:Underground_Lava_Lake"
    >melvorTotH:Underground_Lava_Lake</option
  >
  <option value="melvorTotH:Lightning_Region"
    >melvorTotH:Lightning_Region</option
  >
  <option value="melvorTotH:Lair_of_the_Spider_Queen"
    >melvorTotH:Lair_of_the_Spider_Queen</option
  >
  <option value="melvorTotH:Cursed_Forest">melvorTotH:Cursed_Forest</option>
  <option value="melvorTotH:Necromancers_Palace"
    >melvorTotH:Necromancers_Palace</option
  >
  <option value="melvorTotH:Throne_of_the_Herald"
    >melvorTotH:Throne_of_the_Herald</option
  >
  <option value="melvorAoD:Golem_Territory">melvorAoD:Golem_Territory</option>
  <option value="melvorAoD:Unholy_Forest">melvorAoD:Unholy_Forest</option>
  <option value="melvorAoD:Trickery_Temple">melvorAoD:Trickery_Temple</option>
  <option value="melvorAoD:Cult_Grounds">melvorAoD:Cult_Grounds</option>
  <option value="melvorAoD:Underwater_City">melvorAoD:Underwater_City</option>
  <option value="melvorItA:The_Abyssal_Approach"
    >melvorItA:The_Abyssal_Approach</option
  >
  <option value="melvorItA:Into_The_Abyss">melvorItA:Into_The_Abyss</option>
</datalist>

<datalist id="slayerTaskCategories">
  <option value="melvorF:Easy" />
  <option value="melvorF:Normal" />
  <option value="melvorF:Hard" />
  <option value="melvorF:Elite" />
  <option value="melvorF:Master" />
  <option value="melvorTotH:Legendary" />
  <option value="melvorTotH:Mythical" />
  <option value="melvorItA:Woe" />
  <option value="melvorItA:Decay" />
  <option value="melvorItA:Fear" />
  <option value="melvorItA:Ruin" />
  <option value="melvorItA:Isolation" />
  <option value="melvorItA:Dissolution" />
  <option value="melvorItA:Resolution" />
</datalist>

<datalist id="worldMapIDs">
  <option value="melvorAoD:Melvor" />
  <option value="melvorAoD:Lemvor" />
</datalist>

<datalist id="abyssDepths">
  <option value="melvorItA:Depth1" />
  <option value="melvorItA:Depth2" />
  <option value="melvorItA:Depth3" />
  <option value="melvorItA:Depth4" />
  <option value="melvorItA:Depth5" />
  <option value="melvorItA:Depth6" />
  <option value="melvorItA:Depth7" />
  <option value="melvorItA:Depth8" />
  <option value="melvorItA:Depth9" />
</datalist>

<datalist id="realms">
  <option value="melvorD:Melvor" />
  <option value="melvorItA:Abyssal" />
  <option value="melvorItA:Eternal" />
</datalist>

<datalist id="currencyIDs">
  <option value="melvorD:GP" />
  <option value="melvorD:SlayerCoins" />
  <option value="melvorD:RaidCoins" />
  <option value="melvorItA:AbyssalPieces" />
  <option value="melvorItA:AbyssalSlayerCoins" />
</datalist>

<!-- #endregion -->

<style lang="scss">
  @use "sass:math";
  @import "/src/styles/globals.scss";
  @import "/src/styles/input.scss";
  @import "/src/styles/button.scss";

  :global(.hidden) {
    display: none !important;
  }

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
