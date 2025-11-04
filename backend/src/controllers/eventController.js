import { getUpcomingEvents } from '../services/eventService.js';

export async function getEventCalendar(req, res, next) {
  try {
    const events = await getUpcomingEvents();
    res.json(events);
  } catch (error) {
    next(error);
  }
}

export default {
  getEventCalendar,
};
