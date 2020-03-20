import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { unit, colors } from '../styles';
import dog1 from '../../public/assets/images/dog-1.png';
import dog2 from '../../public/assets/images/dog-2.png';
import dog3 from '../../public/assets/images/dog-3.png';

const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97
const avatars = [dog1, dog2, dog3];
const maxIndex = avatars.length - 1;

const pickAvatarByEmail = email => {
	const charCode = email.toLowerCase().charCodeAt(0) - offset;
	const percentile = Math.max(0, Math.min(max, charCode)) / max;
	return avatars[Math.round(maxIndex * percentile)];
};

const Header = ({ image, children = 'Space Explorer' }) => {
	const email = atob(localStorage.getItem('token'));
	const avatar = image || pickAvatarByEmail(email);

	return (
		<Container>
			<Image round={!image} src={avatar} alt="Space dog" />
			<div>
				<h2 style={{ color: 'black' }}>{children}</h2>
				<Subheading>{email}</Subheading>
			</div>
		</Container>
	);
};

Header.propTypes = {
	image: PropTypes.string,
	children: PropTypes.string
};

const Container = styled.div`
	display: 'flex';
	align-items: 'center';
	margin-bottom: ${unit * 4.5}px;
`;

const Image = styled.img`
	width: 134px;
	height: 134px;
	margin-right: ${unit * 2.5}px;
	border-radius: ${props => (props.round ? '50%' : '0%')};
`;

const Subheading = styled.h5`
	margin-top: ${unit / 2}px;
	color: ${colors.textSecondary};
`;

export default Header;
