import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';

const LaunchDetail = ({ id, site, rocket }) => (
	<Card
		style={{
			backgroundImage: getBackgroundImage(toString(id))
		}}
	>
		<h3>
			{rocket && rocket.name} ({rocket && rocket.type})
		</h3>
		<h5>{site}</h5>
	</Card>
);

LaunchDetail.propTypes = {
	id: PropTypes.string,
	site: PropTypes.string,
	rocket: PropTypes.object
};

const Card = styled(cardClassName)`
	height: 365px;
	margin-bottom: ${unit * 4}px;
`;

export default LaunchDetail;
