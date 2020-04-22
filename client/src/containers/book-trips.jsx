import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Button from '../components/button';
import { GET_LAUNCH } from './cart-item';

export const BOOK_TRIPS = gql`
	mutation BookTrips($launchIds: [ID]!) {
		bookTrips(launchIds: $launchIds) {
			success
			message
			launches {
				id
				isBooked
			}
		}
	}
`;

const BookTrips = ({ cartItems }) => {
	const [bookTrips, { data }] = useMutation(BOOK_TRIPS, {
		variables: { launchIds: cartItems },
		refetchQueries: cartItems.map(launchId => ({
			query: GET_LAUNCH,
			variables: { launchId }
		})),

		update(cache) {
			cache.writeData({ data: { cartItems: [] } });
		}
	});

	let $content = null;
	if (!data || (!!data && !data.bookTrips)) {
		$content = <p data-testid="message">{data.bookTrips.message}</p>;
	} else {
		$content = (
			<Button onClick={bookTrips} data-testid="book-button">
				Book All
			</Button>
		);
	}

	return $content;
};

BookTrips.propTypes = {
	cartItems: PropTypes.array
};

export default BookTrips;
