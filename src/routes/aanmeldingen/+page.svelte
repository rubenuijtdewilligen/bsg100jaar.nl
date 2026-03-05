<script>
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';

  export let data;
  $: ({ aanmeldingen, error } = data);
</script>

<div class="mb-8 text-center">
  <h1 class="text-3xl font-bold">Wie zijn erbij?</h1>
  {#if aanmeldingen}
    <p class="mt-2 text-lg opacity-80">
      Al <span class="font-bold text-yellow-400">{aanmeldingen.length}</span> aanmeldingen voor het feest
      van de eeuw!
    </p>
  {/if}
</div>

{#if error}
  <div class="alert alert-error mx-auto max-w-2xl">
    <span>{error}</span>
  </div>
{:else if !aanmeldingen}
  <div class="flex flex-col items-center justify-center py-20 text-primary">
    <FontAwesomeIcon icon={faSpinner} class="animate-spin text-5xl" />
    <p class="mt-4 text-lg font-medium text-neutral-content">De gastenlijst wordt opgehaald...</p>
  </div>
{:else if aanmeldingen.length === 0}
  <div class="py-10 text-center italic text-gray-500">
    <p>Nog geen bevestigde aanmeldingen gevonden...</p>
  </div>
{:else}
  <div
    class="mx-auto flex max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg"
  >
    {#each aanmeldingen as aanmelding, i}
      <div
        class="flex items-center gap-4 p-4 {i !== aanmeldingen.length - 1
          ? 'border-b border-white/10'
          : ''} transition-colors hover:bg-white/10"
      >
        <span class="text-lg font-medium leading-tight">{aanmelding.name}</span>
      </div>
    {/each}
  </div>
{/if}

<div class="mb-6 flex flex-col items-center border-t border-white/20 pt-8">
  <p class="mb-4 text-center font-bold italic opacity-90">Staat jouw naam hier nog niet tussen?</p>
  <a
    href="https://events.flextickets.nl/event/bsg-100-jaar"
    class="btn btn-primary btn-lg text-white shadow-xl transition-transform hover:scale-105"
  >
    IK WIL OOK KOMEN!
  </a>
</div>
