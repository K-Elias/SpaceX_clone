import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import MenuItem from '../../components/menu-item';

describe('Menu Item', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<MenuItem to="/wow" />);
	});
});
