import React from "react";
import styled from "styled-components";

import MenuItem from "./menu-item";
import LogoutButton from "../containers/logout-button";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import { colors, unit } from "../styles";

export default () => (
  <Container>
    <InnerContainer>
      <MenuItem to="/">
        <HomeIcon />
        Home
      </MenuItem>
      <MenuItem to="/cart">
        <CartIcon />
        Cart
      </MenuItem>
      <MenuItem to="/profile">
        <ProfileIcon />
        Profile
      </MenuItem>
      <LogoutButton />
    </InnerContainer>
  </Container>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled.footer`
  flex-shrink: 0;
  margin-top: auto;
  background-color: white;
  color: ${colors.textSecondary};
  position: sticky;
  bottom: 0;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 460;
  padding: ${unit * 2.5};
  margin: 0 auto;
`;
