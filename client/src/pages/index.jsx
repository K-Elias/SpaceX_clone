import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

const Pages = () => (
	<Router>
		<PageContainer>
			<Switch>
				<Route exact path="/" component={Launches} />
				<Route path="/launch/:launchId" component={Launch} />
				<Route path="/cart" component={Cart} />
				<Route path="/profile" component={Profile} />
			</Switch>
		</PageContainer>
		<Footer />
	</Router>
);

export default Pages;
