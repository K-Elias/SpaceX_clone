import React from 'react';
import styled from 'styled-components';

import MenuItem from './menu-item';
import LogoutButton from '../containers/logout-button';
import HomeIcon from '../../public/assets/icons/home.svg';
import CartIcon from '../../public/assets/icons/cart.svg';
import ProfileIcon from '../../public/assets/icons/profile.svg';
import { colors, unit } from '../lib/styles';

export default () => (
	<Container>
		<InnerContainer>
			<MenuItem to="/launch">
				<HomeIcon />
				Home
			</MenuItem>
			<MenuItem to="/cart">
				<CartIcon />
				Cart
			</MenuItem>
			<MenuItem to="/profile">
				<ProfileIcon />
				Profile
			</MenuItem>
			<LogoutButton />
		</InnerContainer>
	</Container>
);

const Container = styled.footer`
	flex-shrink: 0;
	margin-top: auto;
	background-color: white;
	color: ${colors.textSecondary};
	position: sticky;
	bottom: 0;
`;

const InnerContainer = styled.div`
	display: flex;
	align-items: center;
	max-width: 460px;
	padding: ${unit * 2.5}px;
	margin: 0 auto;
`;
