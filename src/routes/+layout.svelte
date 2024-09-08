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
  import NavigationBarItem from "$lib/components/NavigationBar/NavigationBarItem.svelte";
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
  <style>
    body {
      margin: 0;
      overflow: hidden;
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

<!-- #region Datalists -->
<datalist id="skillIDs">
  <option value="melvorD:Attack">melvorD:Attack</option>
  <option value="melvorD:Strength">melvorD:Strength</option>
  <option value="melvorD:Defence">melvorD:Defence</option>
  <option value="melvorD:Hitpoints">melvorD:Hitpoints</option>
  <option value="melvorD:Ranged">melvorD:Ranged</option>
  <option value="melvorD:Magic">melvorD:Magic</option>
  <option value="melvorD:Prayer">melvorD:Prayer</option>
  <option value="melvorD:Slayer">melvorD:Slayer</option>
  <option value="melvorD:Woodcutting">melvorD:Woodcutting</option>
  <option value="melvorD:Fishing">melvorD:Fishing</option>
  <option value="melvorD:Firemaking">melvorD:Firemaking</option>
  <option value="melvorD:Cooking">melvorD:Cooking</option>
  <option value="melvorD:Mining">melvorD:Mining</option>
  <option value="melvorD:Smithing">melvorD:Smithing</option>
  <option value="melvorD:Thieving">melvorD:Thieving</option>
  <option value="melvorD:Farming">melvorD:Farming</option>
  <option value="melvorD:Fletching">melvorD:Fletching</option>
  <option value="melvorD:Crafting">melvorD:Crafting</option>
  <option value="melvorD:Runecrafting">melvorD:Runecrafting</option>
  <option value="melvorD:Herblore">melvorD:Herblore</option>
  <option value="melvorD:Agility">melvorD:Agility</option>
  <option value="melvorD:Summoning">melvorD:Summoning</option>
  <option value="melvorD:Astrology">melvorD:Astrology</option>
  <option value="melvorD:Township">melvorD:Township</option>
  <option value="melvorAoD:Cartography">melvorAoD:Cartography</option>
  <option value="melvorAoD:Archaeology">melvorAoD:Archaeology</option>
  <option value="melvorItA:Harvesting">melvorItA:Harvesting</option>
  <option value="melvorItA:Corruption">melvorItA:Corruption</option>
</datalist>

<datalist id="namespaces">
  <option value="melvorBaseGame">melvorBaseGame</option>
  <option value="melvorTrue">melvorTrue</option>
  <option value="melvorD">melvorD</option>
  <option value="melvorF">melvorF</option>
  <option value="melvorTotH">melvorTotH</option>
  <option value="melvorAoD">melvorAoD</option>
  <option value="melvorItA">melvorItA</option>
  <option value="melvorBirthday2023">melvorBirthday2023</option>
  <option value="melvorAprilFools2024">melvorAprilFools2024</option>
</datalist>

<datalist id="dungeonIDs">
  <option value="melvorD:Chicken_Coop">melvorD:Chicken_Coop</option>
  <option value="melvorD:Undead_Graveyard">melvorD:Undead_Graveyard</option>
  <option value="melvorD:Spider_Forest">melvorD:Spider_Forest</option>
  <option value="melvorD:Frozen_Cove">melvorD:Frozen_Cove</option>
  <option value="melvorD:Deep_Sea_Ship">melvorD:Deep_Sea_Ship</option>
  <option value="melvorD:Volcanic_Cave">melvorD:Volcanic_Cave</option>
  <option value="melvorD:Bandit_Base">melvorD:Bandit_Base</option>
  <option value="melvorD:Hall_of_Wizards">melvorD:Hall_of_Wizards</option>
  <option value="melvorF:Air_God_Dungeon">melvorF:Air_God_Dungeon</option>
  <option value="melvorF:Water_God_Dungeon">melvorF:Water_God_Dungeon</option>
  <option value="melvorF:Earth_God_Dungeon">melvorF:Earth_God_Dungeon</option>
  <option value="melvorF:Fire_God_Dungeon">melvorF:Fire_God_Dungeon</option>
  <option value="melvorF:Dragons_Den">melvorF:Dragons_Den</option>
  <option value="melvorF:Miolite_Caves">melvorF:Miolite_Caves</option>
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
  <option value="melvorF:Easy">melvorF:Easy</option>
  <option value="melvorF:Normal">melvorF:Normal</option>
  <option value="melvorF:Hard">melvorF:Hard</option>
  <option value="melvorF:Elite">melvorF:Elite</option>
  <option value="melvorF:Master">melvorF:Master</option>
  <option value="melvorTotH:Legendary">melvorTotH:Legendary</option>
  <option value="melvorTotH:Mythical">melvorTotH:Mythical</option>
  <option value="melvorItA:Woe">melvorItA:Woe</option>
  <option value="melvorItA:Decay">melvorItA:Decay</option>
  <option value="melvorItA:Fear">melvorItA:Fear</option>
  <option value="melvorItA:Ruin">melvorItA:Ruin</option>
  <option value="melvorItA:Isolation">melvorItA:Isolation</option>
  <option value="melvorItA:Dissolution">melvorItA:Dissolution</option>
  <option value="melvorItA:Resolution">melvorItA:Resolution</option>
</datalist>

<datalist id="worldMapIDs">
  <option value="melvorAoD:Melvor">melvorAoD:Melvor</option>
  <option value="melvorAoD:Lemvor">melvorAoD:Lemvor</option>
</datalist>

<datalist id="abyssDepths">
  <option value="melvorItA:Depth1">melvorItA:Depth1</option>
  <option value="melvorItA:Depth2">melvorItA:Depth2</option>
  <option value="melvorItA:Depth3">melvorItA:Depth3</option>
  <option value="melvorItA:Depth4">melvorItA:Depth4</option>
  <option value="melvorItA:Depth5">melvorItA:Depth5</option>
  <option value="melvorItA:Depth6">melvorItA:Depth6</option>
  <option value="melvorItA:Depth7">melvorItA:Depth7</option>
  <option value="melvorItA:Depth8">melvorItA:Depth8</option>
  <option value="melvorItA:Depth9">melvorItA:Depth9</option>
</datalist>

<datalist id="realms">
  <option value="melvorD:Melvor">melvorD:Melvor</option>
  <option value="melvorItA:Abyssal">melvorItA:Abyssal</option>
  <option value="melvorItA:Eternal">melvorItA:Eternal</option>
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
