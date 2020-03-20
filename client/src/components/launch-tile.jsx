import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import galaxy from '../../public/assets/images/galaxy.jpg';
import iss from '../../public/assets/images/iss.jpg';
import moon from '../../public/assets/images/moon.jpg';
import { unit } from '../styles';

const backgrounds = [galaxy, iss, moon];

export const getBackgroundImage = id =>
	`url(${backgrounds[Number(id) % backgrounds.length]})`;

const LaunchTile = ({ launch: { id, mission, rocket } }) => (
	<CardClassName>
		<StyledLink
			to={`/launch/${id}`}
			style={{
				backgroundImage: getBackgroundImage(id)
			}}
		>
			<h3>{mission.name}</h3>
			<h5>{rocket.name}</h5>
		</StyledLink>
	</CardClassName>
);

LaunchTile.propTypes = {
	launch: PropTypes.object
};

export const CardClassName = styled.div`
	padding: ${unit * 4}px ${unit * 5}px;
	border-radius: 7px;
	color: white;
	background-size: cover;
	background-position: center;
`;

const padding = unit * 2;
const StyledLink = styled(Link)`
	display: block;
	h3 {
		font-size: 20px;
	}
	padding: ${unit * 4}px ${unit * 5}px;
	border-radius: 7px;
	color: white;
	background-size: cover;
	background-position: center;
	height: 193px;
	margin-top: ${padding}px;
	text-decoration: none;
	&&:not(:last-child) {
		margin-bottom: ${padding * 2}px;
	}
`;

export default LaunchTile;
