import styled, { keyframes } from 'styled-components';

import Logo from '../../public/assets/icons/logo.svg';
import { colors } from '../styles';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(Logo)`
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

export default Loading;
