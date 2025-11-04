import { safeGet } from './api';

const fallbackEvents = [
  {
    id: 'event-1',
    name: 'Concert K-Pop Nouveaux Talents',
    location: 'Yes24 Live Hall, Séoul',
    startDate: new Date().toISOString(),
    description:
      'Scène mettant en lumière des rookies et des groupes de trainees avec des zones photo interactives.',
    category: 'K-Pop',
  },
  {
    id: 'event-2',
    name: 'Festival des lanternes de Busan',
    location: 'Plage de Gwangalli, Busan',
    startDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    description:
      'Célébration traditionnelle avec des ateliers de calligraphie et des stands de street-food locale.',
    category: 'Traditionnel',
  },
];

export async function fetchUpcomingEvents() {
  return safeGet('/events/upcoming', fallbackEvents);
}
