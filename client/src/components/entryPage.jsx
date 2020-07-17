import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colors, unit } from '../lib/styles';
import space from '../../public/assets/images/space.jpg';
import Logo from '../../public/assets/icons/logo.svg';
import Curve from '../../public/assets/icons/curve.svg';
import Rocket from '../../public/assets/icons/rocket.svg';

const EntryPage = ({ children }) => (
	<Container>
		<Header>
			<StyledCurve />
			<StyledLogo />
		</Header>
		<StyledRocket />
		<Heading>Space Explorer</Heading>
		{children}
	</Container>
);

EntryPage.propTypes = {
	children: PropTypes.element
};

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

export const StyledLogo = styled(props => <Logo {...props} />)`
	width: 56px;
	height: 56px;
	display: block;
	margin: 0 auto;
	position: relative;
`;

export const StyledCurve = styled(props => <Curve {...props} />)`
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

export const StyledRocket = styled(props => <Rocket {...props} />)`
	${svgClassName};
	width: 250px;
`;

export default EntryPage;
