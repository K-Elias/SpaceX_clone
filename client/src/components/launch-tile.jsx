import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import galaxy from '../../assets/images/galaxy.jpg';
import iss from '../../assets/images/iss.jpg';
import moon from '../../assets/images/moon.jpg';
import { unit } from '../styles';

const backgrounds = [galaxy, iss, moon];

export const getBackgroundImage = id =>
	`url(${backgrounds[parseInt(id) % backgrounds.length]})`;

const LaunchTile = ({ id, mission, rocket }) => (
	<StyledLink
		to={`/launch/${id}`}
		style={{
			backgroundImage: getBackgroundImage(id)
		}}
	>
		<h3>{mission.name}</h3>
		<h5>{rocket.name}</h5>
	</StyledLink>
);

LaunchTile.propTypes = {
	id: PropTypes.string,
	mission: PropTypes.object,
	rocket: PropTypes.object
};

export const cardClassName = styled.div`
	padding: ${unit * 4}px ${unit * 5}px;
	border-radius: 7px;
	color: white;
	background-size: cover;
	background-position: center;
`;

const padding = unit * 2;
const StyledLink = styled(Link)`
	display: block;
	height: 193px;
	margin-top: ${padding}px;
	text-decoration: none;
	&&:not(:last-child) {
		margin-bottom: ${padding * 2}px;
	}
`;

export default LaunchTile;
