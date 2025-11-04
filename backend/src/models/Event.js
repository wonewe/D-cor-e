import mongoose from '../config/db.js';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    ticketLink: { type: String },
    language: { type: String, default: 'ko' },
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);

export default Event;
