import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import isEmail from 'isemail';
import helmet from 'helmet';
import compression from 'compression';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { createStore } from './utils';
import typeDefs from './schema';
import resolvers from './resolvers';
import UserAPI from './datasources/user';
import LaunchAPI from './datasources/launches';
import webpackConfig from '../../webpack.config.babel';

config();
const { PORT, NODE_ENV } = process.env;

const store = createStore();
const app = express();

app.use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(compression())
  .use(helmet());

if (NODE_ENV === 'development') {
  
  const compiler = webpack(webpackConfig.default);
  app.use(historyApiFallback({}));
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
  app.use(express.static(path.resolve(__dirname, '../../dist')));

} else if (NODE_ENV === 'production') {

  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get(['/', '/launch/*'], (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(422).json(err.message);
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  }),
  context: async ({ req }) => {
    const auth = req.headers && req.headers.authorization || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    if (!isEmail.validate(email)) return { user: null };
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] || null;

    return { user: { ...user.dataValues } };
  },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, err => {
  if (err) throw new Error(err);
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})