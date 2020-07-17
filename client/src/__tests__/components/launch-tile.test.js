import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import LaunchTile from '../../components/launch-tile';

describe('Launch Tile', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(
			<LaunchTile
				launch={{
					__typename: 'Launch',
					isBooked: false,
					id: '1',
					mission: {
						name: 'the first one',
						__typename: 'Mission',
						missionPatch: null
					},
					rocket: { name: 'harambe', __typename: 'Rocket', id: '1' }
				}}
			/>
		);
	});
});
