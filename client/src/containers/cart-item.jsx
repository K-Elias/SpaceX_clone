import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import LaunchTile from '../components/launch-tile';
import { LAUNCH_TILE_DATA } from '../pages/launches';

export const GET_LAUNCH = gql`
	query GetLaunch($launchId: ID!) {
		launch(id: $launchId) {
			...LaunchTile
		}
	}
	${LAUNCH_TILE_DATA}
`;

const CartItem = ({ launchId }) => {
	const { data, loading, error } = useQuery(GET_LAUNCH, {
		variables: { launchId }
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	return data && <LaunchTile launch={data.launch} />;
};

CartItem.propTypes = {
	launchId: PropTypes.number
};

export default CartItem;
