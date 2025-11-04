import Event from '../models/Event.js';

const fallbackEvents = [
  {
    id: 'event-1',
    name: 'Soirée Rooftop K-Indie',
    location: 'Hongdae, Séoul',
    category: 'K-Indie',
    description:
      'Concert intimiste sur rooftop avec ateliers de DJ set et stand de boissons coréennes artisanales.',
    startDate: new Date().toISOString(),
  },
  {
    id: 'event-2',
    name: 'Festival Han Style',
    location: 'Busan',
    category: 'Culture',
    description:
      'Défilé hanbok fusion et marché nocturne, idéal pour explorer la tradition revisitée.',
    startDate: new Date(Date.now() + 86400000 * 3).toISOString(),
  },
];

export async function getUpcomingEvents() {
  const today = new Date();
  const events = await Event.find({
    startDate: { $gte: today },
  })
    .sort({ startDate: 1 })
    .limit(30)
    .lean();

  if (!events.length) {
    return fallbackEvents;
  }

  return events.map((event) => ({
    id: event._id.toString(),
    ...event,
  }));
}

export default {
  getUpcomingEvents,
};
