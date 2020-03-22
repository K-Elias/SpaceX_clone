import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { render } from 'react-dom';
import React from 'react';
import gql from 'graphql-tag';

import { resolvers, typeDefs } from './resolvers';
import register from './registerServiceWorker';
import Pages from './pages/index';
import Login from './pages/login';
import GlobalStyle from './styles';

const cache = new InMemoryCache();
const link = new HttpLink({
	headers: { authorization: localStorage.getItem('token') },
	uri: process.env.CLIENT_URL,
	typeDefs,
	resolvers
});

const client = new ApolloClient({
	cache,
	link
});

const IS_LOGGED_IN = gql`
	query IsUserLoggedIn {
		isLoggedIn @client
	}
`;

const IsLoggedIn = () => {
	const { data } = useQuery(IS_LOGGED_IN);
	if (!data) return <Login />;
	return data.isLoggedIn ? <Pages /> : <Login />;
};

const app = document.getElementById('app');

if (app) {
	render(
		<ApolloProvider client={client}>
			<GlobalStyle />
			<IsLoggedIn />
		</ApolloProvider>,
		app
	);
} else throw new Error('Error: check index.html file');

register();
