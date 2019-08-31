import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';

class MeetupSubscriptionController {
  async index(req, res) {
    const pageSize = 10;
    const page = req.query.page || 1;
    const date = req.query.date ? parseISO(req.query.date) : null;
    const onlyRegisteredMeetups =
      (req.query.onlyRegisteredMeetups &&
        req.query.onlyRegisteredMeetups === 'true') ||
      false;
    const onlyFutureMeetups =
      (req.query.onlyFutureMeetups && req.query.onlyFutureMeetups === 'true') ||
      false;
    const { userId } = req;

    const whereDate = date
      ? { date: { [Op.between]: [startOfDay(date), endOfDay(date)] } }
      : null;
    const whereFutureMeetups = onlyFutureMeetups
      ? { date: { [Op.gte]: new Date() } }
      : null;

    const meetups = await Meetup.findAll({
      where: [whereDate, whereFutureMeetups].filter(x => x),
      include: [
        {
          model: File,
          required: false,
          as: 'banner',
          attributes: ['path', 'url'],
        },
        {
          model: Subscription,
          required: onlyRegisteredMeetups,
          where: { attendee_id: userId },
          attributes: ['id'],
        },
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],

      order: ['date', 'name'],

      limit: pageSize,
      offset: pageSize * page - pageSize,
    });

    return res.json(meetups);
  }
}

export default new MeetupSubscriptionController();
