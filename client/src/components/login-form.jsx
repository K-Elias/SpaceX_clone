import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colors, unit } from '../lib/styles';
import Button from './button';
import space from '../../public/assets/images/space.jpg';
import Logo from '../../public/assets/icons/logo.svg';
import Curve from '../../public/assets/icons/curve.svg';
import Rocket from '../../public/assets/icons/rocket.svg';

const LoginForm = ({ login }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailChange = event => setEmail(event.target.email);

	const passwordChange = event => setPassword(event.target.password);

	const onSubmit = event => {
		event.preventDefault();
		login({ variables: { email, password } });
	};

	return (
		<Container>
			<Header>
				<StyledCurve />
				<StyledLogo />
			</Header>
			<StyledRocket />
			<Heading>Space Explorer</Heading>
			<StyledForm onSubmit={onSubmit}>
				<StyledInput
					required
					type="email"
					name="email"
					placeholder="Email"
					data-testid="login-input"
					onChange={emailChange}
				/>
				<StyledInput
					required
					type="password"
					name="password"
					placeholder="Password"
					data-testid="pwd-input"
					onChange={passwordChange}
				/>
				<Button type="submit">Log in</Button>
				<CreateAccButton>Create account</CreateAccButton>
			</StyledForm>
		</Container>
	);
};

LoginForm.propTypes = {
	login: PropTypes.func
};

const CreateAccButton = styled.button`
	display: block;
	min-width: 200px;
	margin-top: 13px;
	height: 10px;
	margin: 0 auto;
	padding: 0 ${unit * 4}px;
	border: none;
	border-radius: 4px;
	font-family: inherit;
	font-size: 18px;
	line-height: 4px;
	font-weight: 500;
	color: blue;
	text-transform: uppercase;
	background-color: white;
	cursor: pointer;
	outline: none;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: center;
	flex-grow: 1;
	/* padding-bottom: ${unit * 6}; */
	color: white;
	background-color: ${colors.primary};
	background-image: url(${space});
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	background-position: center;
	
`;

const svgClassName = css`
	display: block;
	fill: currentColor;
`;

const Header = styled.header`
	${svgClassName};
	width: 100%;
	padding: ${unit * 2.5}px;
	position: relative;
`;

const StyledLogo = styled(Logo)`
	width: 56px;
	height: 56px;
	display: block;
	margin: 0 auto;
	position: relative;
`;

const StyledCurve = styled(Curve)`
	width: 100%;
	height: 100%;
	fill: ${colors.primary};
	position: absolute;
	top: 0;
	left: 0;
`;

const Heading = styled.h1`
	margin: ${unit * 2}px 0 ${unit}px;
`;

const StyledRocket = styled(Rocket)`
	${svgClassName};
	width: 250px;
`;

const StyledForm = styled.form`
	width: 100%;
	max-width: 406px;
	padding: ${unit * 3.5}px;
	border-radius: 3px;
	box-shadow: 6px 6px 1px rgba(0, 0, 0, 0.25);
	color: ${colors.text};
	background-color: white;
`;

const StyledInput = styled.input`
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

export default LoginForm;
