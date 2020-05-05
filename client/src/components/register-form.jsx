import React, { useState } from 'react';

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
import { clientURL } from '../App';
import Button from './button';

const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');

	const emailChange = e => setEmail(e.target.value);
	const passwordChange = e => setPassword(e.target.value);
	const repasswordChange = e => setRepassword(e.target.value);

	const onSubmit = e => {
		e.preventDefault();
		if (password !== repassword) throw new Error('bad password');
		const url = clientURL();
		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);
		fetch(`${url}/register`, {
			method: 'POST',
			body: formData
		}).then(() => {
			setEmail('');
			setPassword('');
			setRepassword('');
		});
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

export default RegisterForm;
