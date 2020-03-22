import React from 'react';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/react-hooks';

import { menuItemClassName } from '../components/menu-item';
import ExitIcon from '../../public/assets/icons/exit.svg';

export default () => {
	const client = useApolloClient();
	const handleClick = () => {
		client.writeData({ data: { isLoggedIn: false } });
		localStorage.clear();
	};
	return (
		<StyledButton onClick={handleClick}>
			<ExitIcon />
			Logout
		</StyledButton>
	);
};

const StyledButton = styled.button`
	${menuItemClassName}
	background: none;
	border: none;
	padding: 0;
`;
