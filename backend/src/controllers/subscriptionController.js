import { createSubscription, handleWebhook } from '../services/subscriptionService.js';
import env from '../config/env.js';
import Stripe from 'stripe';

const stripe = env.stripeWebhookSecret
  ? new Stripe(env.stripeSecretKey)
  : null;

export async function createStripeSubscription(req, res, next) {
  try {
    const { customerId, priceId } = req.body;
    if (!customerId || !priceId) {
      return res.status(400).json({ message: 'customerId and priceId are required' });
    }
    const subscription = await createSubscription({ customerId, priceId });
    return res.status(201).json(subscription);
  } catch (error) {
    return next(error);
  }
}

export async function stripeWebhookHandler(req, res, next) {
  if (!stripe) {
    return res.status(200).send('Stripe webhook not configured');
  }

  const signature = req.headers['stripe-signature'];
  try {
    const event = Stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.stripeWebhookSecret
    );
    await handleWebhook(event);
    return res.json({ received: true });
  } catch (error) {
    return next(error);
  }
}

export default {
  createStripeSubscription,
  stripeWebhookHandler,
};
