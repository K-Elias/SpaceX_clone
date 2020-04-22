import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';

export const TOGGLE_CART = gql`
	mutation addOrRemoveFromCart($launchId: ID!) {
		addOrRemoveFromCart(id: $launchId) @client
	}
`;

export const CANCEL_TRIP = gql`
	mutation cancel($launchId: ID!) {
		cancelTrip(launchId: $launchId) {
			success
			message
			launches {
				id
				isBooked
			}
		}
	}
`;

const ActionButton = ({ isBooked, id, isInCart }) => {
	const [mutate, { loading, error }] = useMutation(
		isBooked ? CANCEL_TRIP : TOGGLE_CART,
		{
			variables: { launchId: id },
			refetchQueries: [
				{
					query: GET_LAUNCH_DETAILS,
					variables: { launchId: id }
				}
			]
		}
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>An error occurred</p>;

	const cart = isInCart ? 'Remove from Cart' : 'Add to Cart';
	const booked = isBooked ? 'Cancel This Trip' : cart;
	return (
		<div>
			<Button onClick={mutate} data-testid="action-button">
				{booked}
			</Button>
		</div>
	);
};

ActionButton.propTypes = {
	isBooked: PropTypes.bool,
	id: PropTypes.string,
	isInCart: PropTypes.bool
};

export default ActionButton;
