<script>
  import { tick } from 'svelte'
  import { posts, index } from './store'

  import Header from './Header.svelte'
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

  $: isShowAll = $index == undefined
  $: isShowOne = $index != undefined
</script>

<Header --width="1240px" --background="#222" --color={'white'} />

<main>
  {#if isShowAll}
    {#each $posts as post, idx}
      <Card {post} on:click={() => showSinglePost(idx)} />
    {:else}
      <Spinner />
    {/each}
  {/if}

  {#if isShowOne}
    <Card post={$posts[$index]} on:click={() => backToHome()} isSingle={true} />
  {/if}
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
    padding: 0;
    background-image: linear-gradient(320deg, #f27121, #e94057, #8a2387);
    background-attachment: fixed;
  }
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));
    gap: 3rem;
    max-width: 1240px;
    margin-inline: auto;
    padding-block: 4rem;
  }
</style>
