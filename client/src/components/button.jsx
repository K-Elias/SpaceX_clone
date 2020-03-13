import styled from "styled-component";
import { lighten } from "polished";

import { unit, colors } from "../styles";

const height = 50;

export default styled.button`
  display: block;
  min-width: 200;
  height: ${height};
  margin: 0 auto;
  padding: 0 ${unit * 4}px;
  border: none;
  border-radius: ${height / 2};
  font-family: inherit;
  font-size: 18;
  line-height: ${height}px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  background-color: ${colors.accent};
  cursor: pointer;
  outline: none;
  &&:hover {
    background-color: lighten(0.1; ${colors.accent});
  };
  &&:active': {
    background-color: lighten(0.2, ${colors.accent});
  },
`;
