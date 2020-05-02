import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server-express';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import isEmail from 'isemail';

import { User, Trip } from '../model';

export default class UserAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  getUser() {
    if (!this.context.user) throw new Error('User not defined');
    return this.context.user;
  }

  async bookTrips({ launchIds }) {
    let results = [];
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }
    return results;
  }

  async bookTrip({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    const res = await Trips.find({ userId: user.id, launchId });
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    return !!Trips.delete({ userId: user.id, launchId });
  }

  async getLaunchIdsByUser() {
    const user = this.context.user;
    if (!user) return null;
    const found = await Trips.find({ userId: user.id });
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : [];
  }

  async isBookedOnLaunch({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    const found = await Trips.find({ userId, launchId });
    return found && found.length > 0;
  }
};