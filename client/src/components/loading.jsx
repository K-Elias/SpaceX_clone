import React from 'react';
import styled, { keyframes } from 'styled-components';

import Logo from '../../public/assets/icons/logo.svg';
import { colors } from '../styles';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingLogo = styled(Logo)`
	width: 64px;
	height: 64px;
	display: block;
	margin: auto;
	fill: ${colors.grey};
	path {
		transform-origin: center;
		animation: ${spin} 1s linear infinite;
	}
`;

const Loading = () => (
	<div style={{ height: '100%' }}>
		<LoadingLogo />
	</div>
);

export default Loading;
