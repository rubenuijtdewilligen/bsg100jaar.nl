export async function load({ fetch }) {
  const url =
    'https://script.google.com/macros/s/AKfycbyvd_Dn1jXJ0NRJvtG174XakrshoLD1bccH1lVeAhpmkpGr6GfS-ofkFyamTGf-n_wU/exec';

  try {
    const response = await fetch(url);
    const data = await response.json();

    const aanmeldingen = data
      .filter((item) => item.Voornaam)
      .map((item) => ({
        naam: item.Voornaam,
        woonplaats: item.uit || '',
        jaar: item.jaar || ''
      }))
      .sort((a, b) => a.naam.localeCompare(b.naam, 'nl', { sensitivity: 'base' }));

    return { aanmeldingen };
  } catch {
    return { aanmeldingen: [], error: 'Kon de lijst niet laden.' };
  }
}
