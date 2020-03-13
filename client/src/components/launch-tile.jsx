import React from "react";
import styled from "styled-components";
import { Link } from "react-router";

import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import { unit } from "../styles";

const backgrounds = [galaxy, iss, moon];
export function getBackgroundImage(id: string) {
  return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}

export default ({ launch }) => {
  const { id, mission, rocket } = launch;
  return (
    <StyledLink
      to={`/launch/${id}`}
      style={{
        backgroundImage: getBackgroundImage(id)
      }}
    >
      <h3>{mission.name}</h3>
      <h5>{rocket.name}</h5>
    </StyledLink>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export const cardClassName = styled.div`
  padding: ${unit * 4}px ${unit * 5}px;
  border-radius: 7;
  color: white;
  background-size: cover;
  background-position: center;
`;

const padding = unit * 2;
const StyledLink = styled(Link)`
  display: block;
  height: 193;
  margin-top: ${padding};
  text-decoration: none;
  &&:not(:last-child) {
    margin-bottom: ${padding * 2};
  }
`;
