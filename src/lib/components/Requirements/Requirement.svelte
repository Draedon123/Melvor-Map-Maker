<script lang="ts">
  import type { AnyRequirementData } from "$lib/melvor/schema";
  import ListInput from "./ListInput.svelte";

  export let requirement: AnyRequirementData;
</script>

{#if requirement.type === "AbyssDepthCompletion"}
  The depth <input bind:value={requirement.depthID} list="abyssDepths" /> must
  be completed at least
  <input type="number" bind:value={requirement.count} step="1" min="1" /> times
{:else if requirement.type === "AbyssalLevel"}
  The skill <input bind:value={requirement.skillID} list="skillIDs" /> must have
  at least abyssal level
  <input type="number" bind:value={requirement.level} step="1" min="1" />
{:else if requirement.type === "AllSkillLevels"}
  Every skill must be at least level <input
    type="number"
    bind:value={requirement.level}
    step="1"
    min="1"
  />
  except the (comma seperated) skills <ListInput
    bind:value={requirement.exceptions}
    placeholder="(Optional)"
  />. This only includes skills under the namespace
  <input bind:value={requirement.namespace} placeholder="(Optional)" />
{:else if requirement.type === "ArchaeologyItemsDonated"}
  A minimum of <input
    type="number"
    bind:value={requirement.count}
    min="1"
    step="1"
  /> items must be donated to the Archaeology Museum
{:else if requirement.type === "CartographyHexDiscovery"}
  A minimum of <input
    type="number"
    bind:value={requirement.count}
    min="1"
    step="1"
  />
  hexes must be fully surveyed in the Cartography Map
  <input bind:value={requirement.worldMapID} list="worldMapIDs" />
{:else if requirement.type === "CartographyPOIDiscovery"}
  The (comma seperated) points of interest <ListInput
    bind:value={requirement.poiIDs}
  /> must be discovered in the Cartography Map
  <input bind:value={requirement.worldMapID} list="worldMapIDs" />
{:else if requirement.type === "Completion"}
  A minimum of <input
    type="number"
    bind:value={requirement.percent}
    min="0"
    max="100"
  />
  percent completion must be achieved in the namespace
  <input bind:value={requirement.namespace} list="namespaces" />
{:else if requirement.type === "DungeonCompletion"}
  The dungeon <input bind:value={requirement.dungeonID} list="dungeonIDs" />
  must be cleared at least
  <input type="number" bind:value={requirement.count} min="1" step="1" /> times
{:else if requirement.type === "ItemFound"}
  The item <input bind:value={requirement.itemID} /> must have been found at least
  once
{:else if requirement.type === "MasteryLevel"}
  The action <input bind:value={requirement.actionID} /> in the skill
  <input bind:value={requirement.skillID} list="skillIDs" />
  must be at least mastery level
  <input type="number" bind:value={requirement.level} min="1" step="1" />
{:else if requirement.type === "MonsterKilled"}
  The monster <input bind:value={requirement.monsterID} /> must be killed at
  least
  <input type="number" bind:value={requirement.count} min="1" step="1" /> times
{:else if requirement.type === "ShopPurchase"}
  The shop purchase <input bind:value={requirement.purchaseID} /> must be
  purchased at least
  <input type="number" bind:value={requirement.count} min="1" step="1" /> times
{:else if requirement.type === "SkillLevel"}
  The skill <input bind:value={requirement.skillID} list="skillIDs" /> must be
  at least level
  <input type="number" bind:value={requirement.level} min="1" step="1" />
{:else if requirement.type === "SkillTreeNodeUnlocked"}
  The skill tree <input bind:value={requirement.skillTreeID} /> for the skill
  <input bind:value={requirement.skillID} />
  must have the node <input bind:value={requirement.nodeID} /> unlocked
{:else if requirement.type === "SlayerItem"}
  The item <input bind:value={requirement.itemID} /> must currently be equipped
{:else if requirement.type === "SlayerTask"}
  A minimum of <input
    type="number"
    bind:value={requirement.count}
    min="1"
    step="1"
  />
  slayer tasks in the slayer category
  <input bind:value={requirement.category} /> must be completed
{:else if requirement.type === "TownshipBuilding"}
  A minimum of <input
    type="number"
    bind:value={requirement.count}
    min="1"
    step="1"
  />
  township building <input bind:value={requirement.buildingID} /> must be actively
  built
{:else if requirement.type === "TownshipTask"}
  A minimum of <input
    type="number"
    bind:value={requirement.count}
    min="1"
    step="1"
  />
  township tasks attached to the realm
  <input
    bind:value={requirement.realm}
    placeholder="(Optional)"
    list="realms"
  /> must be completed
{/if}
