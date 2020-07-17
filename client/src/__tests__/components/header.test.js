import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import Header from '../../components/header';

describe('Header', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<Header />);
	});
});
