import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import historyApiFallback from 'connect-history-api-fallback-exclusions';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken
} from './auth';
import store from './model';
import typeDefs from './schema';
import resolvers from './resolvers';
import UserAPI from './datasources/user';
import LaunchAPI from './datasources/launches';
import webpackConfig from '../../webpack.config.babel';

(() => {

  const {
    PORT,
    NODE_ENV,
    ROUTES,
    ACCESS_KEY,
    REFRESH_KEY,
    MONGO_DB
  } = process.env;

  const app = express();

  app.use(cors({ credentials: true }))
    .use(cookieParser())
    .use(compression())
    .use(helmet())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(express.static(path.resolve(__dirname, '../../dist')));
  
  if (NODE_ENV === 'production') {

    app.get(ROUTES, (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'), err => {
        if (err) console.error(err);
      });
    });

  } else if (NODE_ENV === 'development') {

    const compiler = webpack(webpackConfig.default);
    app.use(historyApiFallback({
      exclusions: ['/graphql']
    }));
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.default.output.publicPath,
      contentBase: path.resolve(__dirname, '../../dist'),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));
    app.use(webpackHotMiddleware(compiler));

  }

  app.post('/refresh_token', async (req, res) => {
    const { cookies: { gin } } = req;
    const sendError = () => res.send({ success: false, accessToken: null });
    if (!gin) return sendError();
    const payload = verify(gin, REFRESH_KEY);
    if (!payload) return sendError();
    const user = await store.User.findOne({ id: payload.userId });
    if (!user) return sendError();
    if (user.tokenVersion !== payload.tokenVersion)
      return sendError();
    sendRefreshToken(createRefreshToken(user), res);
    return res.send({ success: true, accessToken: createAccessToken(user) });
  });

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      launchAPI: new LaunchAPI(),
      userAPI: new UserAPI({ store })
    }),
    context: async ({ req, res }) => {
      const { headers, path } = req;
      let user = null;
      const headerRegex = /(Bearer)\s.+/gm;
      if (ROUTES.includes(path) && headerRegex.test(headers['authorization'])) {
        const authorization = headers['authorization'];
        const token = authorization.split(' ')[1];
        const payload = verify(token, ACCESS_KEY);
        if (Object.keys(payload).includes('userId'))
          user = await store.User.findOne({ id: payload.userId });
      }
      return { user, res };
    }
  });

  apollo.applyMiddleware({ app });

  const server = createServer(app);

  mongoose.set('useCreateIndex', true);

  mongoose.connect(MONGO_DB, { useUnifiedTopology: true })
    .then(() =>
      server.listen({ port: PORT }, err => {
        if (err) throw new Error(err);
        console.log(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`);
      })
    )
    .catch(err => console.error(err));

  process.on('SIGTERM', () =>
    server.close(() => console.log('Process terminated'))
  );

})();
