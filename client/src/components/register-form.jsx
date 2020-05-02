import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	StyledBlock,
	StyledInput,
	Container,
	Header,
	StyledCurve,
	StyledLogo,
	Heading,
	StyledRocket
} from './login-form';
import Button from './button';

const RegisterForm = ({ register }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');

	const emailChange = e => setEmail(e.target.value);
	const passwordChange = e => setPassword(e.target.value);
	const repasswordChange = e => setRepassword(e.target.value);

	const onSubmit = async e => {
		e.preventDefault();
		if (password !== repassword) return null;
		const res = await register({ variables: { email, password } });
		return res;
	};

	return (
		<Container>
			<Header>
				<StyledCurve />
				<StyledLogo />
			</Header>
			<StyledRocket />
			<Heading>Space Explorer</Heading>
			<StyledBlock>
				<form onSubmit={onSubmit}>
					<StyledInput
						required
						type="email"
						name="email"
						placeholder="Type your email"
						data-testid="login-input"
						value={email}
						onChange={emailChange}
					/>
					<StyledInput
						required
						type="password"
						name="password"
						placeholder="Choose a password"
						data-testid="pwd-input"
						value={password}
						onChange={passwordChange}
					/>
					<StyledInput
						required
						type="password"
						name="repassword"
						placeholder="Confirm your password"
						data-testid="repwd-input"
						value={repassword}
						onChange={repasswordChange}
					/>
					<Button type="submit">Register</Button>
				</form>
			</StyledBlock>
		</Container>
	);
};

RegisterForm.propTypes = {
	register: PropTypes.func
};

export default RegisterForm;
