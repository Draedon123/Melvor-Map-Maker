<script lang="ts">
  import type { Project } from "$lib/database/database";
  import { fromArrayBuffer } from "$lib/functions/imageUtils";
  import { base } from "$app/paths";

  export let project: Project;

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

<div class="project">
  <h3>{project.name ?? "Unnamed Project"}</h3>
  {#await image}
    <p>Image loading...</p>
  {:then image}
    <img src={image.src} alt="Thumbnail" class="thumbnail" />
  {/await}
  <div class="footer">asd</div>
</div>

<style lang="scss">
  $footer-height: 1.2rem;

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

    h3 {
      margin: 0;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #909090;
      flex-grow: 1;
    }

    .thumbnail {
      width: 100%;
      aspect-ratio: 1;
    }

    .footer {
      height: $footer-height;
      width: 100%;
      border-top: 1px solid #909090;
    }
  }
</style>
