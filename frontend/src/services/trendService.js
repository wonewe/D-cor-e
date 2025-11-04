import { safeGet } from './api';

const fallbackTrends = [
  {
    id: 'trend-1',
    title: 'Le café Hanok minimaliste',
    category: 'Lifestyle',
    summary:
      'Un café installé dans une maison traditionnelle du quartier Ikseon-dong, combinant esthétique hanok et desserts modernes.',
    publishedAt: new Date().toISOString(),
    tags: ['cafe', 'hanok', 'ikseon'],
  },
  {
    id: 'trend-2',
    title: 'Pop-up K-fashion x Sustainability',
    category: 'Fashion',
    summary:
      'Une collaboration entre designers émergents et marques eco-friendly, à Hongdae, mettant en avant la mode circulaire.',
    publishedAt: new Date().toISOString(),
    tags: ['fashion', 'sustainability'],
  },
];

export async function fetchWeeklyTrends() {
  return safeGet('/trends/weekly', fallbackTrends);
}
