import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import Footer from '../../components/footer';

describe('Footer', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<Footer />);
	});
});
