import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

const Pages = () => (
	<Fragment>
		<PageContainer>
			<Router>
				<Route path="/" component={Launches} />
				<Route path="launch/:launchId" component={Launch} />
				<Route path="cart" component={Cart} />
				<Route path="profile" component={Profile} />
			</Router>
		</PageContainer>
		<Footer />
	</Fragment>
);

export default Pages;
