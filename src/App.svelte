<script>
  import { tick } from 'svelte'
  import { posts, index } from './store'

  import Card from './Card.svelte'
  import Spinner from './Spinner.svelte'

  let lastScrollY

  const showSinglePost = idx => {
    lastScrollY = window.pageYOffset
    $index = idx
  }

  const scrollToLastScrollY = () => scrollTo({ top: lastScrollY, left: 0 })

  const backToHome = async () => {
    $index = null
    await tick()
    scrollToLastScrollY()
  }
</script>

<main>
  {#if $index == undefined}
    {#each $posts as post, idx}
      <Card {post} on:click={() => showSinglePost(idx)} />
    {:else}
      <Spinner />
    {/each}
  {:else}
    <Card post={$posts[$index]} isSingle={true} on:click={() => backToHome()} />
  {/if}
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
    padding: 2rem;
    background-image: linear-gradient(320deg, #f27121, #e94057, #8a2387);
    background-attachment: fixed;
  }
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));
    gap: 3rem;
    max-width: 1240px;
    margin: auto;
    padding-block: 2rem;
  }
</style>
