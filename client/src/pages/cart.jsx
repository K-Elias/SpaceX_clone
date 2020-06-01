import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';

export const GET_CART_ITEMS = gql`
	query GetCartItems {
		cartItems @client
	}
`;

const Cart = () => {
	const { data, loading, error } = useQuery(GET_CART_ITEMS);

	if (loading) return <Loading />;
	if (error) return <p>ERROR: {error.message}</p>;

	let $content = null;

	if (!data || (data && data.cartItems.length === 0)) {
		$content = <p data-testid="empty-message">No items in your cart</p>;
	} else {
		const $dataCart = data.cartItems.map(launchId => (
			<CartItem key={launchId} launchId={parseInt(launchId)} />
		));
		$content = (
			<Fragment>
				{$dataCart}
				<BookTrips cartItems={data.cartItems} />
			</Fragment>
		);
	}
	return (
		<Fragment>
			<Header>My Cart</Header>
			{$content}
		</Fragment>
	);
};

export default Cart;
