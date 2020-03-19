import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { unit } from '../styles';
import { CardClassName, getBackgroundImage } from './launch-tile';

const LaunchDetail = ({ launch }) => (
	<Card
		style={{
			backgroundImage: getBackgroundImage(launch.id)
		}}
	>
		<h3>
			{launch.rocket && launch.rocket.name} (
			{launch.rocket && launch.rocket.type})
		</h3>
		<h5>{launch.site}</h5>
	</Card>
);

LaunchDetail.propTypes = {
	launch: PropTypes.object
};

const Card = styled(CardClassName)`
	height: 365px;
	margin-bottom: ${unit * 4}px;
`;

export default LaunchDetail;
