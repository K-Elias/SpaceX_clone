import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import LaunchDetail from '../../components/launch-detail';

const launch = {
	id: '1',
	site: 'earth',
	rocket: {
		name: 'that one',
		type: 'big',
		__typename: 'Rocket',
		id: '1'
	}
};

describe('Launch Detail View', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<LaunchDetail launch={launch} />);
	});
});
