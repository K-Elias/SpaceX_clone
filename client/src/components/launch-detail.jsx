import React from 'react';
import styled from 'styled-components';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';

const LaunchDetail = { id, site, rocket } => (
  <Card
    style={{
      backgroundImage: getBackgroundImage(id as string),
    }}
  >
    <h3>
      {rocket && rocket.name} ({rocket && rocket.type})
    </h3>
    <h5>{site}</h5>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled(cardClassName)`
  height: 365;
  margin-bottom: ${unit * 4};
`;

export default LaunchDetail;