import { sign } from 'jsonwebtoken';
import 'dotenv/config';

const { ACCESS_KEY, REFRESH_KEY } = process.env;

export const createAccessToken = ({ id }) =>
  sign({ userId: id }, ACCESS_KEY, {
    expiresIn: '15m'
  });

export const createRefreshToken = ({ id, tokenVersion }) =>
  sign({ userId: id, tokenVersion }, REFRESH_KEY, {
    expiresIn: '7d'
  });

export const sendRefreshToken = (token, res) => {
  res.cookie('gin', token, {
    // path: '/refresh_token',
    httpOnly: true
  });
}