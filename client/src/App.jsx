import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const prodURL = '';
const devUrl = 'http://localhost:4000/graphql';
const uri = isProd ? prodURL : devUrl;

const App = ({ children }) => {
	const [user, setUser] = useState({
		email: '',
		token: ''
	});

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri,
			headers: {
				authorization: `Bearer ${user.token}`
			},
			credentials: 'include'
		})
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</UserContext.Provider>
	);
};

App.propTypes = {
	children: PropTypes.array
};

export default App;
