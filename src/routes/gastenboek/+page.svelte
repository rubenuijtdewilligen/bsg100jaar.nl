<script>
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';

  export let data;
  export let form;

  $: page = data.page;

  let loading = false;
  let lastSubmitTime = 0;
  const cooldownTime = 10000;

  async function goToPage(newPage) {
    if (newPage < 1 || newPage > data.totalPages || newPage === page) return;
    page = newPage;
    await invalidateAll();
  }

  const submitPostMessage = ({ cancel }) => {
    const now = Date.now();
    if (now - lastSubmitTime < cooldownTime) {
      toast.error('Wacht efkes 10 seconden vur dagge nog un bericht stuurt!');
      return cancel();
    }

    loading = true;
    lastSubmitTime = now;

    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          toast.success('Oew bericht is gepost!');
          break;
        case 'error':
          toast.error('Er is iets misgegaan.');
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<main>
  <p>
    Deze Lustrumwebsite is geïnspireerd op het ontwerp van een oude BSG website, die van 18
    september 2007 tot minstens 20 oktober 2016 in gebruik was. Net als veel websites uit die tijd
    had ook die een klassiek gastenboek. Dat willen we je hier met plezier laten herbeleven!
  </p>
  <p class="my-2">
    De oude BSG website waar deze Lustrumwebsite op geïnspireerd is vind je <a
      class="link"
      target="_blank"
      href="https://web.archive.org/web/20161020135920/http://www.hetbsg.nl/">hier</a
    >.
  </p>
  <form
    method="POST"
    action="?/postMessage"
    use:enhance={submitPostMessage}
    class="mt-4 flex max-w-lg flex-col rounded-xl border-2 border-neutral-content bg-white p-8"
  >
    <input
      type="text"
      name="name"
      placeholder="Naam"
      required
      disabled={loading}
      value={form?.data?.name}
      class="input input-bordered mb-2"
    />

    {#if form?.errors?.name}
      {#each form.errors.name as error}
        <div class="mb-1 text-sm text-error">{error}</div>
      {/each}
    {/if}

    <textarea
      name="message"
      placeholder="Schrijf een bericht..."
      required
      disabled={loading}
      class="textarea textarea-bordered mb-2">{form?.data?.message}</textarea
    >

    {#if form?.errors?.message}
      {#each form.errors.message as error}
        <div class="mb-1 text-sm text-error">{error}</div>
      {/each}
    {/if}

    <button type="submit" class="btn btn-primary text-white" disabled={loading}>Post Bericht</button
    >
  </form>

  {#if data.entries?.length}
    <ul class="mb-2 mt-4 border-b">
      {#each data.entries as entry}
        <li class="border-t pt-2">
          <small
            >{new Date(entry.created_at).toLocaleDateString() +
              ' om ' +
              new Date(entry.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}</small
          ><br />
          <strong>{entry.name}</strong>:
          <p style="white-space: pre-wrap;">{entry.message}</p>
        </li>
      {/each}
    </ul>

    <p class="text-sm text-gray-600">
      Pagina {data.page} van {data.totalPages} ({data.perPage} berichten per pagina)
    </p>

    <p class="mb-2 text-sm text-gray-600">
      Totaal aantal berichten: {data.totalCount}
    </p>

    <div class="pagination">
      <a
        class="btn-small btn btn-primary text-white {page === 1 ? 'btn-gray disabled-link' : ''}"
        href={page > 1 ? `?page=${page - 1}` : '#'}
        aria-disabled={page === 1}
        rel="prev">Vorige</a
      >

      <a
        class="btn-small btn btn-primary text-white {page === data.totalPages
          ? 'btn-gray disabled-link'
          : ''}"
        href={page < data.totalPages ? `?page=${page + 1}` : '#'}
        aria-disabled={page === data.totalPages}
        rel="next">Volgende</a
      >
    </div>
  {:else}
    <p class="mt-4">Er zijn nog geen berichten.</p>
  {/if}
</main>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 1em;
  }

  .disabled-link {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
