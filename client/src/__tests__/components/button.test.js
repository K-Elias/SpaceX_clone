import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import Button from '../../components/button';

describe('Button', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<Button>Hello World</Button>);
	});
});
