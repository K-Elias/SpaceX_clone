import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { UserContext } from '../App';

const token = 'random-token';

const setToken = jest.fn();

jest.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: jest.fn()
	})
}));

const renderApolloContext = node =>
	render(
		<UserContext.Provider value={{ token, setToken }}>
			<MockedProvider>{node}</MockedProvider>
		</UserContext.Provider>
	);

export * from '@testing-library/react';
export { renderApolloContext };
