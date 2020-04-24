import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server-express';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import isEmail from 'isemail';
import 'dotenv/config';

import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken
} from '../auth';

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
    if (!this.context.user) throw new Error('User not defined');
    return this.context.user;
  }

  async createUser({ image, email, password }) {
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

  async logUser({ email, password }) {
    const user = await this.store.User.findOne({ email });
    if (!user) throw new Error("could not find user");
    const valid = await compare(password, user.password);
    if (!valid) throw new Error("bad password");
    sendRefreshToken(createRefreshToken(user), this.context.res);
    return {
      user,
      accessToken: createAccessToken(user)
    };
  }

  async revokeRefreshToken() {
    if (!this.context.user) return false;
    this.context.user.tokenVersion += 1;
    await this.context.user.save();
    return true;
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
    const user = this.context.user;
    if (!user) return null;
    const res = await this.store.trips.find({ userId: user.id, launchId });
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    return !!this.store.trips.delete({ userId: user.id, launchId });
  }

  async getLaunchIdsByUser() {
    const user = this.context.user;
    if (!user) return null;
    const found = await this.store.trips.find({ userId: user.id });
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : [];
  }

  async isBookedOnLaunch({ launchId }) {
    const user = this.context.user;
    if (!user) return null;
    const found = await this.store.trips.find({ userId, launchId });
    return found && found.length > 0;
  }
};