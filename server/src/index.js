import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import historyApiFallback from 'connect-history-api-fallback-exclusions';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from 'mongoose';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

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
    ACCESS_KEY,
    MONGO_DB
  } = process.env;
  
  const app = express();
  const routes = ['/launches', '/launch/*', '/cart', '/profile', '/graphql'];

  app.use(compression())
    .use(helmet())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(express.static(path.resolve(__dirname, '../../dist')));
  
  if (NODE_ENV === 'production') {

    app.get(routes, (req, res) => {
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      launchAPI: new LaunchAPI(),
      userAPI: new UserAPI({ store })
    }),
    context: async ({ req }) => {
      const { header, path } = req;
      if (!path.includes(routes)) return null;
      const authorization = header['authorization'];
      if (!authorization) return null;
      const token = authorization.split(' ')[1];
      const payload = await verify(token, ACCESS_KEY);
      if (!payload) return null;
      const user = await store.User.findOne(payload);
      if (!user) return null;
      return { user };
    }
  });
  
  server.applyMiddleware({ app });

  mongoose.set('useCreateIndex', true);

  mongoose.connect(MONGO_DB, { useUnifiedTopology: true })
    .then(() =>
      app.listen({ port: PORT }, err => {
        if (err) throw new Error(err);
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
      })
    )
    .catch(err => {
      console.error(err);
      process.exit();
    });
  
  
  process.on('SIGTERM', () =>
    server.close(() =>
      console.log('Process terminated')
  ));

})();
