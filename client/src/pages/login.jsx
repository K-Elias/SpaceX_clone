import { useApolloClient, useMutation } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';

export const LOGIN_USER = gql`
	mutation login($email: String!) {
		login(email: $email)
	}
`;

const Login = () => {
	const client = useApolloClient();
	const [login, { loading, error }] = useMutation(LOGIN_USER, {
		// eslint-disable-next-line no-shadow
		onCompleted({ login }) {
			localStorage.setItem('token', login);
			client.writeData({ data: { isLoggedIn: true } });
		}
	});
	if (loading) return <Loading />;
	if (error) return <p>An error occurred</p>;

	return <LoginForm login={login} />;
};

export default Login;
