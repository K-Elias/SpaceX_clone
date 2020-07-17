import React from 'react';

import { renderApolloContext, cleanup } from '../setupTests';
import LoginForm from '../../components/login-form';

describe('Login Form', () => {
	afterEach(cleanup);

	it('renders without error', () => {
		renderApolloContext(<LoginForm login={() => {}} />);
	});
});
