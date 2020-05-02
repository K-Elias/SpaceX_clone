import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { colors, unit } from '../lib/styles';
import Button from './button';
import space from '../../public/assets/images/space.jpg';
import Logo from '../../public/assets/icons/logo.svg';
import Curve from '../../public/assets/icons/curve.svg';
import Rocket from '../../public/assets/icons/rocket.svg';

const LoginForm = ({ login }) => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailChange = e => setEmail(e.target.email);

	const passwordChange = e => setPassword(e.target.password);

	const onSubmit = e => {
		e.preventDefault();
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
			<StyledBlock>
				<form onSubmit={onSubmit}>
					<StyledInput
						required
						type="email"
						name="email"
						placeholder="Email"
						data-testid="login-input"
						value={email}
						onChange={emailChange}
					/>
					<StyledInput
						required
						type="password"
						name="password"
						placeholder="Password"
						data-testid="pwd-input"
						value={password}
						onChange={passwordChange}
					/>
					<Button type="submit">Log in</Button>
				</form>
				<CreateAccButton onClick={() => history.push('/register')}>
					Create account
				</CreateAccButton>
			</StyledBlock>
		</Container>
	);
};

LoginForm.propTypes = {
	login: PropTypes.func
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

export const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
	padding-bottom: ${unit * 6};
	color: white;
	background-color: ${colors.primary};
	background-image: url(${space});
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
`;

const svgClassName = css`
	display: block;
	fill: currentColor;
`;

export const Header = styled.header`
	${svgClassName};
	width: 100%;
	padding: ${unit * 2.5}px;
	position: relative;
	margin-top: 0;
	margin-bottom: 20px;
`;

export const StyledLogo = styled(Logo)`
	width: 56px;
	height: 56px;
	display: block;
	margin: 0 auto;
	position: relative;
`;

export const StyledCurve = styled(Curve)`
	width: 100%;
	height: 100%;
	fill: ${colors.primary};
	position: absolute;
	top: 0;
	left: 0;
`;

export const Heading = styled.h1`
	margin: ${unit * 2}px 0 ${unit * 3}px;
`;

export const StyledRocket = styled(Rocket)`
	${svgClassName};
	width: 250px;
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

export default LoginForm;
