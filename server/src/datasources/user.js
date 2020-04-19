import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server-express';
import { genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import isEmail from 'isemail';
import 'dotenv/config';

const { ACCESS_KEY } = process.env;

export default class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  getUser() {
    return this.context.user;
  }

  async createUser({ image, email, password } = {}) {
    const checkEmail = await this.store.User.findOne({ email });
    if (checkEmail)
      throw new UserInputError('Email is taken', { errors: 'this email is already taken' });

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = new this.store.User({
      image,
      email,
      password: hashedPassword
    });
    const newUser = await user.save();
    return newUser;
  }

  async bookTrips({ launchIds }) {
    const userId = '';
    if (!userId) return;

    let results = [];
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }

    return results;
  }

  async bookTrip({ launchId }) {
    const userId = this.context.user.id;
    const res = await this.store.trips.find({ userId, launchId });
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    const userId = this.context.user.id;
    return !!this.store.trips.delete({ userId, launchId });
  }

  async getLaunchIdsByUser() {
    const userId = this.context.user.id;
    const found = await this.store.trips.find({ userId });
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : [];
  }

  async isBookedOnLaunch({ launchId }) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.trips.find({ userId, launchId });
    return found && found.length > 0;
  }
}