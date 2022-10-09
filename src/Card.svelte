<script>
  export let isSingle = false
  export let post

  const title = post.title.rendered
  const excerpt = post.excerpt.rendered
  const content = post.content.rendered
  const mediaSizes = post._embedded['wp:featuredmedia']['0']?.media_details.sizes
  const mediumImage = mediaSizes.midrange_square?.source_url
  const largeImage = mediaSizes.large?.source_url
  const fullImage = mediaSizes.full?.source_url

  let backButton
  const handleKeydown = evt => evt.key === 'ArrowLeft' && backButton.click()

  isSingle && scrollTo(0, 0)
</script>

<svelte:window on:keydown={handleKeydown} />

<article>
  {#if !isSingle}
    <div>
      {#if mediumImage}
        <img class="link" loading="lazy" src={mediumImage} alt={title} on:click />
      {:else if largeImage}
        <img class="link" loading="lazy" src={largeImage} alt={title} on:click />
      {:else}
        <img class="link" loading="lazy" src={fullImage} alt={title} on:click />
      {/if}
      <h2 class="link" on:click>{@html title}</h2>
      <div>{@html excerpt}</div>
    </div>
    <button on:click>Read More &raquo;</button>
  {/if}

  {#if isSingle}
    <button bind:this={backButton} on:click>&laquo; Go Back</button>

    <h2>{@html title}</h2>
    <div>{@html content}</div>

    <button on:click>&laquo; Go Back</button>
  {/if}
</article>

<style>
  article {
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 1rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;
  }
  h2 {
    color: #8a2387;
  }
  .link:hover {
    text-decoration: underline;
  }
  img {
    margin-bottom: 1.5rem;
    aspect-ratio: 1;
  }
  .link,
  button {
    cursor: pointer;
  }
  button {
    padding-block: 0.5rem;
    padding-inline: 1rem;
    background-color: #8a2387;
    color: white;
  }
  :global(img) {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  article :global(figure),
  article :global(h2) {
    margin: 0;
    padding: 0;
  }
  article :global(p),
  article :global(li) {
    line-height: 1.5rem;
  }
</style>
