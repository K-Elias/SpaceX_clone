import React from 'react';

import { render, cleanup } from '../../lib/setupTests';
import Button from '../button';

describe('Button', () => {
	afterEach(cleanup);

	it('renders without error', () => render(<Button>Hello World</Button>));
});
