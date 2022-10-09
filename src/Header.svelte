<script>
  import BackButton from './BackButton.svelte'
</script>

<header>
  {#if $index != undefined}
    <BackButton on:click={() => handleBackToHome()} />
  {/if}
</header>
