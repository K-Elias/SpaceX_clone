import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import PageContainer from '../../components/page-container';

describe('Page Container', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<PageContainer />);
	});
});
