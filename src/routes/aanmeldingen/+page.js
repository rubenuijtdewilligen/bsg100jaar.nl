export async function load({ fetch }) {
  const url =
    'https://script.google.com/macros/s/AKfycbyekye6VJ-bxYj61S89PFMjQO06ebaEUZhI9GvU7IW4-0Hs-TWRa1taNs1PY2LARjMFIA/exec';

  try {
    const response = await fetch(url);
    const data = await response.json();

    const aanmeldingen = data
      .filter((item) => item.name)
      .sort((a, b) => {
        return a.name.localeCompare(b.name, 'nl', { sensitivity: 'base' });
      });

    return { aanmeldingen };
  } catch (error) {
    console.error('Fout bij laden aanmeldingen:', error);
    return { aanmeldingen: [], error: 'Kon de lijst niet laden.' };
  }
}
