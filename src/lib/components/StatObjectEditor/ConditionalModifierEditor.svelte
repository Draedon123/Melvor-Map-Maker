<script lang="ts">
  import type { ConditionalModifierData } from "$lib/melvor/schema";

  export let modifiers: Required<ConditionalModifierData>[];
</script>

<ul>
  {#each modifiers as modifier}
    <li>Condition:</li>
  {/each}
</ul>
