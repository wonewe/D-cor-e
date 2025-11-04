import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
import env from '../config/env.js';

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;

export async function createSubscription({ customerId, priceId }) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  await Subscription.create({
    userId: null,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
    planId: priceId,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  });

  return subscription;
}

export async function handleWebhook(event) {
  const { type, data } = event;
  if (!data?.object) return;

  switch (type) {
    case 'customer.subscription.updated': {
      const sub = data.object;
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: sub.id },
        {
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        }
      );
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = data.object;
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: sub.id },
        { status: 'canceled' }
      );
      break;
    }
    default:
      break;
  }
}

export default {
  createSubscription,
  handleWebhook,
};
