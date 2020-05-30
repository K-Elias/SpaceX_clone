import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Container } from '../components/entryPage';

const Error = () => (
	<Container>
		<Message>
			<p>
				<h3>Error 404 : Galaxy not found. . .</h3>
				<br />
				<Link style={{ color: '#fff' }} to="/">
					Return to SpaceX base
				</Link>
				🚀
			</p>
		</Message>
	</Container>
);

const Message = styled.div`
	min-height: 100vh;
	font-size: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'system-ui';
`;

export default Error;
