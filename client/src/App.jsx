import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const clientURL = () => {
	const { NODE_ENV } = process.env;
	const isProd = NODE_ENV === 'production';
	const prodURL = '';
	const devUrl = 'http://localhost:4000';
	return isProd ? prodURL : devUrl;
};

const checkRefreshToken = async setUser => {
	const url = clientURL();
	const result = await (
		await fetch(`${url}/refresh_token`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		})
	).json();
	setUser({
		accesstoken: result.accesstoken
	});
};

const App = ({ children }) => {
	const [user, setUser] = useState({ accesstoken: '' });

	useEffect(() => {
		checkRefreshToken(setUser);
	}, []);

	const link = new HttpLink({
		uri: clientURL(),
		headers: { authorization: `Bearer ${user.accesstoken}` }
	});

	const cache = new InMemoryCache();

	const client = new ApolloClient({ cache, link });

	return (
		<UserContext.Provider value={[user, setUser]}>
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</UserContext.Provider>
	);
};

App.propTypes = {
	children: PropTypes.array
};

export default App;
