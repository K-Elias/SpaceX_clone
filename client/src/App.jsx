import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import { typeDefs, resolvers } from './lib/resolvers';
import { refreshToken } from './lib/auth';

export const UserContext = createContext();

const App = ({ children }) => {
	const [token, setToken] = useState('');

	useEffect(() => {
		const time = setTimeout(() => {
			refreshToken().then(({ data }) => setToken(data.token));
		}, 900000);
		return () => clearTimeout(time);
	}, [token]);

	const cache = new InMemoryCache();

	const client = new ApolloClient({
		cache,
		link: new HttpLink({
			headers: { authorization: `Bearer ${token}` },
			credentials: 'include'
		}),
		typeDefs,
		resolvers
	});

	cache.writeData({
		data: {
			cartItems: []
		}
	});

	return (
		<UserContext.Provider value={{ token, setToken }}>
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</UserContext.Provider>
	);
};

App.propTypes = {
	children: PropTypes.array
};

export default App;
