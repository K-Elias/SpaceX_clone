import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { render } from 'react-dom';
import React from 'react';

import Pages from './pages/index';
import GlobalStyle from './styles';

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: process.env.CLIENT_URL
});

const client = new ApolloClient({
	cache,
	link
});

render(
	<ApolloProvider client={client}>
		<GlobalStyle />
		<Pages />
	</ApolloProvider>,
	document.getElementById('app')
);
