import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';

import { Loading, RegisterForm } from '../components';

const REGISTER_USER = gql`
	mutation register($email: String!, $password: String!) {
		register(email: $email, password: $password)
	}
`;

const Register = () => {
	const [register, { loading, error }] = useMutation(REGISTER_USER);
	if (loading) return <Loading />;
	if (error) return <p>An error occurred</p>;
	return <RegisterForm register={register} />;
};

export default Register;
