import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const UserContext = createContext();

const clientURL = () => {
	const { NODE_ENV } = process.env;
	const isProd = NODE_ENV === 'production';
	const prodURL = '';
	const devUrl = 'http://localhost:4000/graphql';
	return isProd ? prodURL : devUrl;
};

const checkRefreshToken = setUser => {
	axios({
		method: 'POST',
		url: '/refresh_token',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' }
	}).then(({ accessToken }) => {
		setUser({ accessToken });
	});
};

const App = ({ children }) => {
	const [user, setUser] = useState({ accessToken: '' });

	useEffect(() => {
		checkRefreshToken(setUser);
	}, []);

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: clientURL(),
			headers: { authorization: `Bearer ${user.accessToken}` }
		})
	});

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
