import { isBefore } from 'date-fns';

import Mail from '../../lib/Mail';

import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscription from '../models/Subscription';

class SubscriptionController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId);

    if (meetup.organizer_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to past meetups." });
    }

    const checkDate = await Subscription.findOne({
      where: {
        attendee_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res.status(400).json({
        error:
          "Can't subscribe to two meetups at the same time or to the same meetup twice",
      });
    }

    const subscription = await Subscription.create({
      attendee_id: user.id,
      meetup_id: meetup.id,
    });

    const organizer = await User.findByPk(meetup.organizer_id);
    Mail.sendMail({
      to: `${organizer.name} <${organizer.email}>`,
      subject: 'Nova inscrição',
      template: 'newsubscription',
      context: {
        organizer: organizer.name,
        meetup: meetup.name,
        attendee: user.name,
        email: user.email,
      },
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const subscription = await Subscription.findByPk(req.params.id);

    if (subscription == null) {
      return res.status(400).json({ error: 'Subscription does not exist' });
    }

    if (subscription.attendee_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    const meetup = await Meetup.findByPk(subscription.meetup_id);
    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: "Can't delete past subscriptions." });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
