import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { colors, unit } from '../lib/styles';
import { isAuthenticated } from '../lib/auth';
import { UserContext } from '../App';
import MenuItem from './menu-item';
import LogoutButton from '../containers/logout-button';
import HomeIcon from '../../public/assets/icons/home.svg';
import CartIcon from '../../public/assets/icons/cart.svg';
import ProfileIcon from '../../public/assets/icons/profile.svg';

export default () => {
	const { token } = useContext(UserContext);
	const history = useHistory();

	const onLinkChange = async path => {
		const res = await isAuthenticated(token);
		const link = res ? path : '/login';
		history.push(link);
	};

	return (
		<Container>
			<InnerContainer>
				<MenuItem onClick={() => onLinkChange('/launch')}>
					<HomeIcon />
					Home
				</MenuItem>
				<MenuItem onClick={() => onLinkChange('/cart')}>
					<CartIcon />
					Cart
				</MenuItem>
				<MenuItem onClick={() => onLinkChange('/profile')}>
					<ProfileIcon />
					Profile
				</MenuItem>
				<LogoutButton />
			</InnerContainer>
		</Container>
	);
};

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
