import { genSalt, hash, compare } from 'bcrypt';
import { verify } from 'jsonwebtoken'; 
import 'dotenv/config';

import  { isEmail } from './utils';

import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
  sendAccessToken
} from './token';
import { User } from './model';

const { ACCESS_KEY, REFRESH_KEY, ROUTES } = process.env;

export const isAuth = async req => {
  let user = null;
  const { path, headers } = req;
  const headerRegex = /(Bearer)\s.+/gm;
  if (ROUTES.includes(path) && headerRegex.test(headers['authorization'])) {
    const authorization = headers['authorization'];
    const token = authorization.split(' ')[1];
    const payload = verify(token, ACCESS_KEY);
    user = await User.findOne({ id: payload.userId });
  }
  return user;
};

export default app => {

  app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!isEmail(email) || (!password || password.length < 5))
      return res.status(400).send('Input not valid: please check input field');
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).send('User already exits');
    try {
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);
      const user = new User({
        email,
        password: hashedPassword
      });
      await user.save();
      res.status(201).send('success');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!isEmail(email) || !password)
      return res.status(400).send('Input not valid: please check input field');
    const user = await User.findOne({ email })
    const verif = await compare(password, user.password);
    if (!verif) return res.status(400).send('Bad password');
    sendRefreshToken(createRefreshToken(user), res);
    sendAccessToken(createAccessToken(user), res);
  });

  app.post('/logout', (req, res) => {
    res.clearCookie('gin');
    res.status(200).json({
      message: 'Logged out',
    });
  });

  app.post('/refresh_token', async (req, res) => {
    if (!req.cookies) return res.sendStatus(401);
    if (!req.cookies.gin) return res.sendStatus(401);
    const { cookies: { gin } } = req;
    const decoded = verify(gin, REFRESH_KEY);
    if (!decoded)
      return res.status(500).send({ success: false, accessToken: null });
    const user = await User.findOne({ id: decoded.userId });
    if (user.tokenVersion !== decoded.tokenVersion)
      return res.status(400).send({ success: false, accessToken: null });
    sendRefreshToken(createRefreshToken(user), res);
    sendAccessToken(createAccessToken(user), res);
  });

  app.post('/revoke_token', (req, res) => {
    const { body : { email } } = req;
    User.findOne({ email })
      .then(user => {
        user.tokenVersion += 1;
        user.save()
          .then(() => res.status(200).send('success'))
          .catch(error => res.status(500).json({ error }))
      })
      .catch(error => res.status(404).json({ error }));
  });

};