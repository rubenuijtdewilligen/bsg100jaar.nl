export const load = async () => {
  const pages = [
    { path: '/', title: 'Homepagina' },
    { path: '/activiteiten', title: 'Activiteiten' },
    { path: '/sponsoren', title: 'Sponsoren' },
    { path: '/gastenboek', title: 'Gastenboek' }
  ];

  return {
    pages
  };
};
