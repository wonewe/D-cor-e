import { Router } from 'express';
import trendRoutes from './trendRoutes.js';
import eventRoutes from './eventRoutes.js';
import phrasebookRoutes from './phrasebookRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';

const router = Router();

router.use('/trends', trendRoutes);
router.use('/events', eventRoutes);
router.use('/phrasebook', phrasebookRoutes);
router.use('/subscriptions', subscriptionRoutes);

export default router;
