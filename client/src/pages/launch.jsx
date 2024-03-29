import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import React, { Fragment } from 'react';
import gql from 'graphql-tag';

import { Loading, Header, LaunchDetail } from '../components';
import { ActionButton } from '../containers';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH_DETAILS = gql`
	query LaunchDetails($launchId: ID!) {
		launch(id: $launchId) {
			isInCart @client
			site
			rocket {
				type
			}
			...LaunchTile
		}
	}
	${LAUNCH_TILE_DATA}
`;

const Launch = () => {
	const { launchId } = useParams();
	const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
		variables: { launchId }
	});
	if (loading) return <Loading />;
	if (error) return <p>ERROR: {error}</p>;
	if (!data || (data && !data.launch)) return <p>Not found</p>;
	return (
		<Fragment>
			<Header image={data.launch.mission.missionPatch}>
				{data.launch.mission.name}
			</Header>
			<LaunchDetail launch={data.launch} />
			<ActionButton launch={data.launch} />
		</Fragment>
	);
};

export default Launch;
