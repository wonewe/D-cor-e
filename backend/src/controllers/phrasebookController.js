import { getPersonalizedPhrases } from '../services/phrasebookService.js';

export async function getPhrasebook(req, res, next) {
  try {
    const phrases = await getPersonalizedPhrases({
      proficiency: req.query.proficiency,
      interests: req.query.interests,
    });
    res.json(phrases);
  } catch (error) {
    next(error);
  }
}

export default {
  getPhrasebook,
};
