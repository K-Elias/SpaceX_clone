import { DataSource } from 'apollo-datasource';

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
  
  async bookTrip({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    const res = await Trip.find({ userId: user.id, launchId });
    return res && res.length ? res[0].get() : false;
  }

  async bookTrips({ launchIds }) {
    let results = [];
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }
    return results;
  }


  async cancelTrip({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    return !!Trip.delete({ userId: user.id, launchId });
  }

  async getLaunchIdsByUser() {
    const user = this.context.user;
    if (!user) return null;
    const found = await Trip.find({ userId: user.id });
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : [];
  }

  async isBookedOnLaunch({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    const found = await Trip.find({ userId: user.id, launchId });
    return found && found.length > 0;
  }
};