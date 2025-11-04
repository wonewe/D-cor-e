import Trend from '../models/Trend.js';

const fallbackTrends = [
  {
    id: 'trend-1',
    title: 'Ikseon Vintage Alley',
    category: 'Lifestyle',
    summary:
      'Une ruelle combinant ateliers artisanaux et cafés concept, idéale pour un itinéraire slow travel.',
    tags: ['ikseon', 'artisanat', 'slowtravel'],
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'trend-2',
    title: 'K-Beauty Clean Lab',
    category: 'Beauty',
    summary:
      'Laboratoire pop-up présentant des routines skincare minimalistes pour peaux sensibles.',
    tags: ['kbeauty', 'cleanbeauty'],
    publishedAt: new Date().toISOString(),
  },
];

export async function getWeeklyTrends() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentTrends = await Trend.find({
    publishedAt: { $gte: oneWeekAgo },
  })
    .sort({ publishedAt: -1 })
    .limit(20)
    .lean();

  if (!recentTrends.length) {
    return fallbackTrends;
  }

  return recentTrends.map((trend) => ({
    id: trend._id.toString(),
    ...trend,
  }));
}

export default {
  getWeeklyTrends,
};
