import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { UserContext } from '../App';
import { menuItemClassName } from '../components/menu-item';
import ExitIcon from '../../public/assets/icons/exit.svg';

export default () => {
	const { setUser } = useContext(UserContext);
	const history = useHistory();
	const handleClick = () => {
		axios({
			method: 'POST',
			url: '/logout',
			credentials: 'include'
		})
			.then(() => setUser({ email: '', token: '', page: '/' }))
			.then(() => history.push('/'));
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
