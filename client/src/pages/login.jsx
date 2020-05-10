import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { colors, unit } from '../lib/styles';
import { UserContext } from '../App';
import { EntryPage, useForm, Button } from '../components';

const initial_value = {
	email: '',
	password: ''
};

const Login = () => {
	const history = useHistory();
	const { setUser } = useContext(UserContext);

	const onSubmit = () =>
		axios.post('/login', { ...values }).then(({ data: { accessToken } }) => {
			setUser({ email: values.email, accessToken });
			history.push('/launch');
		});

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		isSubmitting
	} = useForm(initial_value, onSubmit);

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
						onBlur={handleBlur}
						value={values.email}
						onChange={handleChange}
					/>
					{errors.email && <span className="error-text">{errors.email}</span>}
					<StyledInput
						required
						type="password"
						name="password"
						placeholder="Password"
						data-testid="pwd-input"
						onBlur={handleBlur}
						value={values.password}
						onChange={handleChange}
					/>
					{errors.password && (
						<span className="error-text">{errors.password}</span>
					)}
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
	border: 1px solid ${colors.grey};
	font-size: 16px;
	outline: none;
	&&:focus: {
		border-color: ${colors.primary};
	}
`;

export default Login;
