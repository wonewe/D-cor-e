import { safeGet } from './api';

const fallbackPhrases = [
  {
    id: 'phrase-1',
    topic: 'Café',
    korean: '시그니처 메뉴 뭐예요?',
    pronunciation: 'Si-geu-ni-cheo me-nyu mwo-ye-yo?',
    french: 'Quel est votre menu signature ?',
    tips:
      'Utilisez dans les cafés tendance pour découvrir la boisson la plus recommandée.',
  },
  {
    id: 'phrase-2',
    topic: 'Shopping',
    korean: '이거 다른 색 있어요?',
    pronunciation: 'I-geo da-reun saek i-sseo-yo?',
    french: 'Avez-vous cette pièce dans une autre couleur ?',
    tips: 'Pratique dans les pop-up stores et boutiques de créateurs.',
  },
];

export async function fetchPersonalizedPhrases(params = {}) {
  const query = new URLSearchParams(params).toString();
  const path = query ? `/phrasebook?${query}` : '/phrasebook';
  return safeGet(path, fallbackPhrases);
}
