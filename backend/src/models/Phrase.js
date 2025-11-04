import mongoose from '../config/db.js';

const phraseSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    korean: { type: String, required: true },
    french: { type: String, required: true },
    pronunciation: { type: String },
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    tips: { type: String },
  },
  { timestamps: true }
);

export const Phrase = mongoose.model('Phrase', phraseSchema);

export default Phrase;
