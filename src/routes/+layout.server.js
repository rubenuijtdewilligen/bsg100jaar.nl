export const load = async () => {
  const pages = [
    { path: '/', title: 'Homepagina' },
    { path: '/aanmeldingen', title: 'Wie komen er?' },
    { path: '/activiteiten', title: 'Activiteiten' },
    { path: '/sponsoren', title: 'Sponsoren' },
    { path: '/gastenboek', title: 'Gastenboek' }
  ];

  return {
    pages
  };
};
