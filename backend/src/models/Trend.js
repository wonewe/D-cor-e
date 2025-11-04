import mongoose from '../config/db.js';

const trendSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, default: Date.now },
    spotlightScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Trend = mongoose.model('Trend', trendSchema);

export default Trend;
