import { sign } from 'jsonwebtoken';
import 'dotenv/config';

const { ACCESS_KEY, REFRESH_KEY } = process.env;

export const createAccessToken = user =>
  sign({ userId: user.id }, ACCESS_KEY, {
    expiresIn: '15m'
  });

export const createRefreshToken = user =>
  sign({ userId: user.id }, REFRESH_KEY, {
    expiresIn: '7d'
  });

export const sendRefreshToken = (token, res) =>
  res.cookie("gin", token, {
    httpOnly: true
  });