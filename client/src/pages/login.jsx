import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { UserContext } from '../App';
import { colors, unit } from '../lib/styles';
import { EntryPage, useForm, Button } from '../components';
import validate from '../lib/validate';

const initial_value = {
	email: '',
	password: ''
};

const Login = () => {
	const history = useHistory();
	const { setUser } = useContext(UserContext);

	const onSubmit = () =>
		axios({
			method: 'POST',
			url: '/login',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			data: { ...values }
		})
			.then(({ data: { token } }) =>
				setUser({ email: values.email, token, page: '/launch' })
			)
			.then(() => history.push('/launch'));

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		isSubmitting
	} = useForm(initial_value, validate, onSubmit);

	const handleClick = () => history.push('/register');

	return (
		<EntryPage>
			<StyledBlock>
				<form onSubmit={handleSubmit}>
					<StyledInput
						required
						type="email"
						name="email"
						placeholder="Email"
						data-testid="login-input"
						classStyle={errors.email}
						onBlur={handleBlur}
						value={values.email}
						onChange={handleChange}
					/>
					<StyledInput
						required
						type="password"
						name="password"
						placeholder="Password"
						data-testid="pwd-input"
						classStyle={errors.password}
						onBlur={handleBlur}
						value={values.password}
						onChange={handleChange}
					/>
					<Button disabled={isSubmitting} type="submit">
						Log in
					</Button>
				</form>
				<CreateAccButton onClick={handleClick}>Create account</CreateAccButton>
			</StyledBlock>
		</EntryPage>
	);
};

const CreateAccButton = styled.button`
	display: block;
	margin: 0 auto;
	border: none;
	font-family: inherit;
	font-size: 18px;
	font-weight: 500;
	color: ${colors.accent};
	text-transform: uppercase;
	background-color: white;
	cursor: pointer;
	outline: none;
`;

export const StyledBlock = styled.div`
	width: 100%;
	height: 250px;
	max-width: 406px;
	padding: ${unit * 3.5}px;
	border-radius: 3px;
	box-shadow: 6px 6px 1px rgba(0, 0, 0, 0.25);
	color: ${colors.text};
	background-color: white;
`;

export const StyledInput = styled.input`
	width: 100%;
	margin-bottom: ${unit * 2}px;
	padding: ${unit * 1.25}px ${unit * 2.5}px;
	border-width: 1px;
	border-style: solid;
	border-color: ${props => (props.classStyle ? colors.error : colors.grey)};
	font-size: 16px;
	outline: none;
	&&:focus: {
		border-color: ${colors.primary};
	}
`;

export default Login;
