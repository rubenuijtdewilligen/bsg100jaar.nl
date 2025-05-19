export const load = async () => {
  const activities = [
    {
      title: 'Opening Lustrumjaar',
      date: new Date('6-5-2025')
    },
    {
      title: 'Lustrum',
      date: new Date('6-6-2026')
    },
    {
      title: '24u rikmarathon',
      date: new Date('8-23-2025')
    },
    {
      title: '24u rikmarathon',
      date: new Date('8-24-2025')
    }
  ];

  return { events: createEvents(activities) };
};

function createEvents(activities) {
  let events = [];

  activities.forEach((activity) => {
    events.push({
      title: `${activity.title}`,
      start: new Date(activity.date),
      color: '#ff0000',
      display: 'block'
    });
  });

  return events;
}
