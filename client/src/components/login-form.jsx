import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';
import { colors, unit } from '../styles';
import Button from './button';
import space from '../../assets/images/space.jpg';
import Logo from '../../assets/icons/logo.svg';
import Curve from '../../assets/icons/curve.svg';
import Rocket from '../../assets/icons/rocket.svg';

const LoginForm = ({ login }) => {
	const [email, setEmail] = useState('');

	const onChange = event => setEmail(event.target.email);

	const onSubmit = event => {
		event.preventDefault();
		login({ variables: { email } });
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
					onChange={onChange}
				/>
				<Button type="submit">Log in</Button>
			</StyledForm>
		</Container>
	);
};

LoginForm.propTypes = {
	login: PropTypes.func
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
	padding-bottom: ${unit * 6};
	color: white;
	background-color: ${colors.primary};
	background-image: url(${space});
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
	margin-bottom: ${unit * 5}px;
	padding: ${unit * 2.5}px;
	position: relative;
`;

const StyledLogo = styled(Logo)`
	display: block;
	margin: 0 auto;
	position: relative;
`;

const StyledCurve = styled(Curve)`
	fill: ${colors.primary};
	position: absolute;
	top: 0;
	left: 0;
`;

const Heading = styled.h1`
	margin: ${unit * 3}px 0 ${unit * 6}px;
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
