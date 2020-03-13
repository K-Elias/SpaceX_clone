import React, { Fragment } from "react";
import styled from "styled-components";

import { unit, colors } from "../styles";

export default props => (
  <Fragment>
    <Bar />
    <Container>{props.children}</Container>
  </Fragment>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Bar = styled.div`
  flex-shrink: 0;
  height: 12;
  background-color: ${colors.primary};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  max-width: 600;
  margin: 0 auto;
  padding: ${unit * 3};
  padding-bottom: ${unit * 5};
`;
