import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import Loading from '../../components/loading';

describe('Loading', () => {
	// automatically unmount and cleanup DOM after the test is finished.
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<Loading />);
	});
});
