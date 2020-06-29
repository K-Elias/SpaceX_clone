import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

const renderApollo = (
	node,
	{ mocks, addTypename, defaultOptions, cache, resolvers, ...options }
) =>
	render(
		<MockedProvider
			mocks={mocks}
			addTypename={addTypename}
			defaultOptions={defaultOptions}
			cache={cache}
			resolvers={resolvers}
		>
			{node}
		</MockedProvider>,
		options
	);

export * from '@testing-library/react';
export { renderApollo };
