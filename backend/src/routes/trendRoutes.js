import { Router } from 'express';
import { getWeeklyTrendReport } from '../controllers/trendController.js';

const router = Router();

router.get('/weekly', getWeeklyTrendReport);

export default router;
