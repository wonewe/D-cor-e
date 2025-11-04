import { getWeeklyTrends } from '../services/trendService.js';

export async function getWeeklyTrendReport(req, res, next) {
  try {
    const trends = await getWeeklyTrends();
    res.json(trends);
  } catch (error) {
    next(error);
  }
}

export default {
  getWeeklyTrendReport,
};
