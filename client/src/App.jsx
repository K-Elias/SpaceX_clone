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

const isProduction = process.env.NODE_ENV === 'production';

const client_url = '';
const client_url_dev = 'http://localhost:4000/graphql';

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: isProduction ? client_url : client_url_dev,
	credentials: 'include',
	typeDefs,
	resolvers
});

const client = new ApolloClient({
	cache,
	link
});

cache.writeData({
	data: {
		isLoggedIn: false,
		token: null
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
