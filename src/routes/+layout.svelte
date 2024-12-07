<script lang="ts">
  import "tippy.js/dist/tippy.css";
  import "/src/styles/globals.scss";
  import "toastify-js/src/toastify.css";
  import store from "./store";
  import Dialog from "$lib/components/Dialog/Dialog.svelte";
  import Project from "$lib/classes/Project";
  import Toastify from "toastify-js";
  import NavigationBar from "$lib/components/NavigationBar/NavigationBar.svelte";
  import KeyboardShortcut from "$lib/classes/KeyboardShortcut";
  // import StatObjectEditor from "$lib/components/StatObjectEditor/StatObjectEditor.svelte";
  import NavigationBarItem from "$lib/components/NavigationBar/NavigationBarItem.svelte";
  import { dev } from "$app/environment";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { PUBLIC_VERSION } from "$env/static/public";

  type Props = {
    children?: import("svelte").Snippet;
  };

  let { children }: Props = $props();

  console.clear();
  console.log(`App Version: ${PUBLIC_VERSION}`);

  let newProjectModal: Dialog | undefined = $state();
  let projectName: string = $state("Unnamed Project");

  async function createProjectButtonOnClick(): Promise<void> {
    const project = new Project({
      name: projectName,
    });

    await project.save();
    $store.activeProject = project;

    newProjectModal?.close();
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
          newProjectModal?.open();
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
        newProjectModal?.open();
      },
      {
        key: "k",
        modifiers: ["CTRL"],
      }
    );
  });
</script>

<!-- <StatObjectEditor /> -->

<aside>
  <NavigationBar>
    <NavigationBarItem>
      <a href="{base}/" aria-label="Home">
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
      onclick={createProjectButtonOnClick}
      disabled={projectName === ""}
      class="create-project">Create Project</button
    >
    <button onclick={() => newProjectModal?.close()}>Close</button>
  </div>
</Dialog>

<main>
  {@render children?.()}
</main>

<!-- #region Datalists -->
<datalist id="skillIDs">
  <option value="melvorD:Attack"></option>
  <option value="melvorD:Strength"></option>
  <option value="melvorD:Defence"></option>
  <option value="melvorD:Hitpoints"></option>
  <option value="melvorD:Ranged"></option>
  <option value="melvorD:Magic"></option>
  <option value="melvorD:Prayer"></option>
  <option value="melvorD:Slayer"></option>
  <option value="melvorD:Woodcutting"></option>
  <option value="melvorD:Fishing"></option>
  <option value="melvorD:Firemaking"></option>
  <option value="melvorD:Cooking"></option>
  <option value="melvorD:Mining"></option>
  <option value="melvorD:Smithing"></option>
  <option value="melvorD:Thieving"></option>
  <option value="melvorD:Farming"></option>
  <option value="melvorD:Fletching"></option>
  <option value="melvorD:Crafting"></option>
  <option value="melvorD:Runecrafting"></option>
  <option value="melvorD:Herblore"></option>
  <option value="melvorD:Agility"></option>
  <option value="melvorD:Summoning"></option>
  <option value="melvorD:Astrology"></option>
  <option value="melvorD:Township"></option>
  <option value="melvorAoD:Cartography"></option>
  <option value="melvorAoD:Archaeology"></option>
  <option value="melvorItA:Harvesting"></option>
  <option value="melvorItA:Corruption"></option>
</datalist>

<datalist id="namespaces">
  <option value="melvorBaseGame"></option>
  <option value="melvorTrue"></option>
  <option value="melvorD"></option>
  <option value="melvorF"></option>
  <option value="melvorTotH"></option>
  <option value="melvorAoD"></option>
  <option value="melvorItA"></option>
  <option value="melvorBirthday2023"></option>
  <option value="melvorAprilFools2024"></option>
</datalist>

<datalist id="dungeonIDs">
  <option value="melvorD:Chicken_Coop"></option>
  <option value="melvorD:Undead_Graveyard"></option>
  <option value="melvorD:Spider_Forest"></option>
  <option value="melvorD:Frozen_Cove"></option>
  <option value="melvorD:Deep_Sea_Ship"></option>
  <option value="melvorD:Volcanic_Cave"></option>
  <option value="melvorD:Bandit_Base"></option>
  <option value="melvorD:Hall_of_Wizards"></option>
  <option value="melvorF:Air_God_Dungeon"></option>
  <option value="melvorF:Water_God_Dungeon"></option>
  <option value="melvorF:Earth_God_Dungeon"></option>
  <option value="melvorF:Fire_God_Dungeon"></option>
  <option value="melvorF:Dragons_Den"></option>
  <option value="melvorF:Miolite_Caves"></option>
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
  <option value="melvorF:Easy"></option>
  <option value="melvorF:Normal"></option>
  <option value="melvorF:Hard"></option>
  <option value="melvorF:Elite"></option>
  <option value="melvorF:Master"></option>
  <option value="melvorTotH:Legendary"></option>
  <option value="melvorTotH:Mythical"></option>
  <option value="melvorItA:Woe"></option>
  <option value="melvorItA:Decay"></option>
  <option value="melvorItA:Fear"></option>
  <option value="melvorItA:Ruin"></option>
  <option value="melvorItA:Isolation"></option>
  <option value="melvorItA:Dissolution"></option>
  <option value="melvorItA:Resolution"></option>
</datalist>

<datalist id="worldMapIDs">
  <option value="melvorAoD:Melvor"></option>
  <option value="melvorAoD:Lemvor"></option>
</datalist>

<datalist id="abyssDepths">
  <option value="melvorItA:Depth1"></option>
  <option value="melvorItA:Depth2"></option>
  <option value="melvorItA:Depth3"></option>
  <option value="melvorItA:Depth4"></option>
  <option value="melvorItA:Depth5"></option>
  <option value="melvorItA:Depth6"></option>
  <option value="melvorItA:Depth7"></option>
  <option value="melvorItA:Depth8"></option>
  <option value="melvorItA:Depth9"></option>
</datalist>

<datalist id="realms">
  <option value="melvorD:Melvor"></option>
  <option value="melvorItA:Abyssal"></option>
  <option value="melvorItA:Eternal"></option>
</datalist>

<datalist id="currencyIDs">
  <option value="melvorD:GP"></option>
  <option value="melvorD:SlayerCoins"></option>
  <option value="melvorD:RaidCoins"></option>
  <option value="melvorItA:AbyssalPieces"></option>
  <option value="melvorItA:AbyssalSlayerCoins"></option>
</datalist>

<datalist id="damageTypes">
  <option value="melvorD:Normal"></option>
  <option value="melvorF:Pure"></option>
  <option value="melvorItA:Abyssal"></option>
  <option value="melvorItA:Eternal"></option>
</datalist>

<!-- #endregion -->

<style lang="scss">
  @use "sass:math";
  @use "/src/styles/globals.scss";
  @use "/src/styles/input.scss";
  @use "/src/styles/button.scss";

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
      @include button.button(#44cc44);
      @include button.button-disabled(#44cc44);
    }

    input {
      @include input.input;

      & {
        margin: 0.25em 0;
      }
    }

    button {
      @include button.button;
    }
  }

  input.invalid {
    border-color: #ff0000 !important;
    outline-width: 0;
  }

  main {
    margin-top: globals.$navigation-bar-height;
  }

  .navigation-bar-item {
    width: max-content;
    height: globals.$navigation-bar-height;
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
    $dimensions: 0.9 * globals.$navigation-bar-height;
    height: $dimensions;
    width: $dimensions;
    margin-top: math.div((globals.$navigation-bar-height - $dimensions), 2);

    font-size: medium;
  }

  .navigation-bar-item.navigation-bar-icon {
    margin: 0;
    padding: 0;
  }
</style>
