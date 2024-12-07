<script lang="ts" module>
  const REQUIREMENT_TYPES = [
    "Abyss Depth Completion",
    "All Skill Levels",
    "Archaeology Items Donated",
    "Cartography Hex Discovery",
    "Cartography POI Discovery",
    "Completion",
    "Dungeon Completion",
    "Item Found",
    "Mastery Level",
    "Monster Killed",
    "Shop Purchase",
    "Skill Level",
    "Skill Tree Node Unlocked",
    "Slayer Item",
    "Slayer Task",
    "Township Building",
    "Township Task",
  ];
</script>

<script lang="ts">
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import Requirement from "./Requirement.svelte";
  import DropdownOption from "../Dropdown/DropdownOption.svelte";
  import { base } from "$app/paths";
  import type { AnyRequirementData } from "$lib/melvor/schema";

  type Props = {
    requirements?: AnyRequirementData[];
  };

  let { requirements = $bindable([]) }: Props = $props();

  let requirementType: AnyRequirementData["type"] | "" = $state("");

  function addNewRequirement(): void {
    const type = requirementType;
    if (type === "") {
      return;
    }

    requirements.push(
      ((): AnyRequirementData => {
        switch (type) {
          case "SkillLevel": {
            return {
              type,
              skillID: "melvorD:Woodcutting",
              level: 1,
            };
          }
          case "AllSkillLevels": {
            return {
              type,
              level: 1,
              namespace: "melvorTrue",
              exceptions: [],
            };
          }
          case "DungeonCompletion": {
            return {
              type,
              dungeonID: "melvorD:Chicken_Coop",
              count: 1,
            };
          }
          case "Completion": {
            return {
              type,
              percent: 0,
              namespace: "melvorTrue",
            };
          }
          case "ShopPurchase": {
            return {
              type,
              purchaseID: "Extra_Bank_Slot",
              count: 1,
            };
          }
          case "SlayerItem": {
            return {
              type,
              itemID: "melvorD:Red_Party_Hat",
            };
          }
          case "SlayerTask": {
            return {
              type,
              category: "melvorF:Easy",
              count: 1,
            };
          }
          case "ItemFound": {
            return {
              type,
              itemID: "melvorD:Red_Party_Hat",
            };
          }
          case "MonsterKilled": {
            return {
              type,
              monsterID: "melvorD:Golbin",
              count: 1,
            };
          }
          case "TownshipTask": {
            return {
              type,
              realm: "melvorD:Melvor",
              count: 1,
            };
          }
          case "TownshipBuilding": {
            return {
              type,
              buildingID: "melvorF:Malcs_Cats",
              count: 1,
            };
          }
          case "CartographyHexDiscovery": {
            return {
              type,
              worldMapID: "melvorAoD:Lemvor",
              count: 1,
            };
          }
          case "CartographyPOIDiscovery": {
            return {
              type,
              worldMapID: "melvorAoD:Lemvor",
              poiIDs: [],
            };
          }
          case "ArchaeologyItemsDonated": {
            return {
              type,
              count: 1,
            };
          }
          case "AbyssalLevel": {
            return {
              type,
              skillID: "melvorD:Woodcutting",
              level: 1,
            };
          }
          case "SkillTreeNodeUnlocked": {
            return {
              type,
              skillID: "melvorD:Woodcutting",
              skillTreeID: "melvorItA:Abyssal",
              nodeID: "melvorItA:NodeA1",
            };
          }
          case "AbyssDepthCompletion": {
            return {
              type,
              depthID: "melvorItA:Depth1",
              count: 1,
            };
          }
          case "MasteryLevel": {
            return {
              type,
              skillID: "melvorD:Woodcutting",
              actionID: "melvorD:Normal",
              level: 1,
            };
          }
        }
      })()
    );

    requirements = requirements;
  }

  function deleteButtonOnClick(requirement: AnyRequirementData): void {
    requirements.splice(requirements.indexOf(requirement), 1);
    requirements = requirements;
  }
</script>

<div class="new-requirement-container">
  <p>Add new Requirement:</p>
  <div class="dropdown-container">
    <Dropdown
      bind:value={requirementType}
      placeholder="Select a requirement type"
    >
      {#each REQUIREMENT_TYPES as requirement (requirement)}
        <DropdownOption value={requirement.replaceAll(" ", "")}
          >{requirement}</DropdownOption
        >
      {/each}
    </Dropdown>
    <button onclick={addNewRequirement}>Add!</button>
  </div>
</div>

<table>
  <thead>
    <tr>
      <th> Requirement </th>
      <th> Actions </th>
    </tr>
  </thead>
  <tbody>
    {#each requirements as requirement}
      <tr>
        <td>
          <Requirement {requirement} />
        </td>
        <td>
          <input
            type="image"
            src="{base}/delete.png"
            alt="A bin"
            onclick={() => deleteButtonOnClick(requirement)}
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
