import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { UserContext } from '../App';

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWI4NmFjZGMzZjg4ZDIzOTc4NTljYzEiLCJpYXQiOjE1OTQ5ODQ0NjUsImV4cCI6MjQ1ODk4NDQ2NX0.KXwoGOmJ3Z6-1CNjkVDqGNRNicnTAK8E5v42kG-sihs';

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
