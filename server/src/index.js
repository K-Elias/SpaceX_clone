import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { config } from 'dotenv';
import isEmail from 'isemail';

import { createStore } from './utils';
import typeDefs from './schema';
import resolvers from './resolvers';
import UserAPI from './datasources/user';
import LaunchAPI from './datasources/launches';

config();
const { PORT } = process.env;

const store = createStore();
const app = express()
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

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);