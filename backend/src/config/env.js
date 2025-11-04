import dotenv from 'dotenv';

dotenv.config();

export const env = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/local_companion',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  translationProvider: process.env.TRANSLATION_PROVIDER || 'papago',
  translationApiKey: process.env.TRANSLATION_API_KEY || '',
};

export default env;
