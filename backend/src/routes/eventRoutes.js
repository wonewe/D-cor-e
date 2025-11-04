import { Router } from 'express';
import { getEventCalendar } from '../controllers/eventController.js';

const router = Router();

router.get('/upcoming', getEventCalendar);

export default router;
