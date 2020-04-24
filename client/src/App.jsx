import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { render } from 'react-dom';
import React from 'react';

import { resolvers, typeDefs } from './lib/resolvers';
import register from './lib/registerServiceWorker';
import Pages from './pages/index';
import GlobalStyle from './lib/styles';

const { NODE_ENV, CLIENT_URL, CLIENT_URL_DEV } = process.env;
const isProduction = NODE_ENV === 'production';

const cache = new InMemoryCache();
const link = new HttpLink({
	headers: { authorization: '' },
	uri: isProduction ? CLIENT_URL : CLIENT_URL_DEV,
	typeDefs,
	resolvers
});

const client = new ApolloClient({
	cache,
	link
});

cache.writeData({
	data: {
		isLoggedIn: false
	}
});

const app = document.getElementById('app');

if (app) {
	render(
		<ApolloProvider client={client}>
			<GlobalStyle />
			<Pages />
		</ApolloProvider>,
		app
	);
} else throw new Error('Error: check index.html file');

register();
