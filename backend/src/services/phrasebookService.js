import Phrase from '../models/Phrase.js';

const fallbackPhrases = [
  {
    id: 'phrase-1',
    topic: 'Café',
    korean: '시그니처 메뉴 뭐예요?',
    french: 'Quel est votre menu signature ?',
    pronunciation: 'Si-geu-ni-cheo me-nyu mwo-ye-yo?',
    tips:
      'Idéal pour les cafés tendances qui proposent une boisson vedette.',
  },
  {
    id: 'phrase-2',
    topic: 'Shopping',
    korean: '혹시 오늘만 하는 이벤트 있어요?',
    french: 'Avez-vous une promotion spéciale pour aujourd’hui ?',
    pronunciation: 'Hok-si o-neul-man ha-neun i-ben-teu i-sseo-yo?',
    tips: 'Parfait dans les pop-up stores et marchés éphémères.',
  },
];

export async function getPersonalizedPhrases({
  proficiency = 'beginner',
  interests = [],
}) {
  const filters = {
    proficiency,
  };

  const phrases = await Phrase.find(filters).limit(40).lean();

  if (!phrases.length) {
    return fallbackPhrases;
  }

  const interestMatches = Array.isArray(interests)
    ? interests.map((i) => i.toLowerCase())
    : String(interests)
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

  const prioritized = phrases
    .map((phrase) => ({
      id: phrase._id.toString(),
      ...phrase,
      score: interestMatches.includes(phrase.topic.toLowerCase()) ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score);

  return prioritized;
}

export default {
  getPersonalizedPhrases,
};
