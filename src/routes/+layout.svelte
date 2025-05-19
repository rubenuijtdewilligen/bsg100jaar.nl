<script>
  import '../app.css';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faArrowUpRightFromSquare, faLink } from '@fortawesome/free-solid-svg-icons';
  import { config } from '@fortawesome/fontawesome-svg-core';
  import '@fortawesome/fontawesome-svg-core/styles.css';
  import { page } from '$app/stores';

  config.autoAddCss = false;

  export let data;

  $: path = $page.url.pathname;
  $: title =
    data.pages
      .filter((page) => path.startsWith(page.path))
      .sort((a, b) => b.path.length - a.path.length)
      ?.at(0)?.title + ' • BSG 100 jaar' || 'BSG 100 jaar';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
    rel="stylesheet"
  />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="m-0 bg-neutral p-0 text-neutral-content md:mx-32 md:rounded-xl lg:mx-48">
  <!-- Header -->
  <div class="mx-auto flex max-w-5xl items-center justify-between p-4">
    <a href="/"><img src="/logo_banner_lang.png" alt="BSG100jaar Logo" class="max-h-24" /></a>
  </div>

  <!-- Hero -->
  <section class="relative h-60 bg-cover bg-center" style="background-image: url('/header.png')">
    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div
        class="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 md:flex md:flex-wrap md:justify-center"
      >
        {#each data.pages as pageItem}
          <a
            class="btn border-0 font-bold lg:btn-lg {path === pageItem.path
              ? 'bg-yellow-400 text-black hover:bg-yellow-400'
              : 'bg-red-600 text-white hover:bg-red-700'}"
            href={pageItem.path}
          >
            {pageItem.title}
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- Content -->
  <main class="mx-auto mt-8 max-w-4xl px-4 pb-4">
    <slot></slot>
  </main>

  <!-- Footer -->
  <div class="border-t-2 border-t-neutral-content py-2 text-center">
    © Brabants Studenten Gilde | 2025-heden |
    <a href="https://github.com/rubenuijtdewilligen/bsg100jaar.nl" class="link" target="_blank">
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Broncode
    </a>
  </div>
</div>
