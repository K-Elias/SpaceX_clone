import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { unit, colors } from '../styles';

const PageContainer = ({ children }) => (
	<Fragment>
		<Bar />
		<Container>{children}</Container>
	</Fragment>
);

PageContainer.propTypes = {
	children: PropTypes.object
};

const Bar = styled.div`
	flex-shrink: 0;
	height: 12px;
	background-color: ${colors.primary};
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 100%;
	max-width: 600;
	margin: 0 auto;
	padding: ${unit * 3}px;
	padding-bottom: ${unit * 5}px;
`;

export default PageContainer;
