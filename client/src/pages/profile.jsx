import { useQuery } from '@apollo/react-hooks';
import React, { Fragment } from 'react';
import gql from 'graphql-tag';

import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_MY_TRIPS = gql`
	query GetMyTrips {
		me {
			trips {
				...LaunchTile
			}
		}
	}
	${LAUNCH_TILE_DATA}
`;

const Profile = () => {
	const { data, loading, error } = useQuery(GET_MY_TRIPS, {
		fetchPolicy: 'network-only'
	});
	if (loading) return <Loading />;
	if (error) return <p>ERROR: {error.message}</p>;
	if (!data || (!!data && !data.me)) return <p>ERROR</p>;
	const $data = data.me.trips.map(launch => (
		<LaunchTile key={launch.id} launch={launch} />
	));
	const msg = "You haven't booked any trips";
	const $errorMsg = <p>{msg}</p>;
	return (
		<Fragment>
			<Header>My Trips</Header>
			{data.me && data.me.trips.length ? $data : $errorMsg}
		</Fragment>
	);
};

export default Profile;
