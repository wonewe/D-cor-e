import mongoose from '../config/db.js';

const travelerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    locale: { type: String, default: 'fr' },
    interests: { type: [String], default: [] },
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    subscriptionStatus: {
      type: String,
      enum: ['none', 'trial', 'active', 'canceled'],
      default: 'none',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', travelerSchema);

export default User;
