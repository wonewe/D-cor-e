import { Router } from 'express';
import {
  createStripeSubscription,
  stripeWebhookHandler,
} from '../controllers/subscriptionController.js';

const router = Router();

router.post('/', createStripeSubscription);
router.post(
  '/webhook',
  (req, res, next) => {
    req.rawBody = req.body;
    next();
  },
  stripeWebhookHandler
);

export default router;
