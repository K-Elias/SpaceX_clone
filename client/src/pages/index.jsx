import React, { Fragment } from "react";
import { Router } from "react-router";

import Launch from "./launch";
import Launches from "./launches";
import Cart from "./cart";
import Profile from "./profile";
import { Footer, PageContainer } from "../components";

const Pages = () => (
  <Fragment>
    <PageContainer>
      <Router component={Fragment}>
        <Launches path="/" />
        <Launch path="launch/:launchId" />
        <Cart path="cart" />
        <Profile path="profile" />
      </Router>
    </PageContainer>
    <Footer />
  </Fragment>
);

export default Pages;
