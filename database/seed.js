import { connectDatabase } from '../backend/src/config/db.js';
import Trend from '../backend/src/models/Trend.js';
import Event from '../backend/src/models/Event.js';
import Phrase from '../backend/src/models/Phrase.js';

async function seed() {
  await connectDatabase();

  await Promise.all([Trend.deleteMany({}), Event.deleteMany({}), Phrase.deleteMany({})]);

  await Trend.insertMany([
    {
      title: 'Pop-up concept: Seoul Night Market',
      category: 'Lifestyle',
      summary:
        'Immersion nocturne à Séoul avec mix de street-food et installations digitales interactives.',
      tags: ['streetfood', 'immersif'],
      publishedAt: new Date(),
    },
  ]);

  await Event.insertMany([
    {
      name: 'K-Drama Set Tour',
      description: 'Visite guidée des lieux de tournage populaires des séries 2024.',
      location: 'Séoul',
      category: 'K-Drama',
      startDate: new Date(Date.now() + 86400000 * 7),
    },
  ]);

  await Phrase.insertMany([
    {
      topic: 'K-Drama',
      korean: '이 장면 어디서 촬영했어요?',
      french: 'Où cette scène a-t-elle été tournée ?',
      pronunciation: 'I jang-myeon eo-di-seo chwal-yeong-hae-sseo-yo?',
      tips: 'À poser sur les lieux de tournage emblématiques.',
      proficiency: 'intermediate',
    },
  ]);

  // eslint-disable-next-line no-console
  console.log('Seed data created');
  process.exit(0);
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
