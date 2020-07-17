import { useHistory } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { UserContext } from '../App';
import { logout } from '../lib/auth';
import { menuItemClassName } from '../components/menu-item';
import ExitIcon from '../../public/assets/icons/exit.svg';

export default () => {
	const { setToken } = React.useContext(UserContext);
	const history = useHistory();

	const handleClick = () => {
		logout().then(() => {
			setToken('');
			history.push('/login');
		});
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
	cursor: pointer;
`;
