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
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { User } from './model';
import Authentication, { isAuth } from './auth';
import typeDefs from './schema';
import resolvers from './resolvers';
import UserAPI from './datasources/user';
import LaunchAPI from './datasources/launches';
import webpackConfig from '../../webpack.config.babel';

(() => {

  const {
    PORT,
    NODE_ENV,
    CLIENT_URL,
    CLIENT_URL_DEV,
    ROUTES,
    ACCESS_KEY,
    MONGO_DB
  } = process.env;

  const app = express();

  const url = NODE_ENV === 'production' ? CLIENT_URL : CLIENT_URL_DEV; 

  app.use(cookieParser())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(express.static(path.resolve(__dirname, '../../dist')))
    .use(helmet())
    .use(compression());
  
  if (NODE_ENV === 'production') {

    const allRoutes = ROUTES.push('/login');
    app.get(allRoutes, (req, res) => {
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

  Authentication(app);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      launchAPI: new LaunchAPI(),
      userAPI: new UserAPI()
    }),
    context: ({ req }) => ({
      user: isAuth(req)
    })
  });

  apollo.applyMiddleware({ app });

  const server = createServer(app);

  mongoose.set('useCreateIndex', true);

  mongoose.connect(MONGO_DB, { useUnifiedTopology: true })
    .then(() =>
      server.listen({ port: PORT }, err => {
        if (err) throw new Error(err);
        console.log(`🚀 Server ready at ${url}:${PORT}${apollo.graphqlPath}`);
      })
    )
    .catch(err => console.error(err));

  process.on('SIGTERM', () =>
    server.close(() => console.log('Process terminated'))
  );

})();
