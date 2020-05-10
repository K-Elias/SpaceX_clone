import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import React, { Fragment, useContext } from 'react';

import { Footer, PageContainer } from '../components';
import { UserContext } from '../App';
import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import Register from './register';
import Login from './login';
import Error from './error';

const Layout = props => (
	<Fragment>
		<PageContainer>
			<Route {...props} />
		</PageContainer>
		<Footer />
	</Fragment>
);

const PrivateRoute = props => {
	const {
		user: { accessToken }
	} = useContext(UserContext);
	return accessToken ? <Layout {...props} /> : <Redirect to="/" />;
};

const Pages = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/register" component={Register} />
			<PrivateRoute exact path="/launch" component={Launches} />
			<PrivateRoute path="/launch/:launchId" component={Launch} />
			<PrivateRoute path="/cart" component={Cart} />
			<PrivateRoute path="/profile" component={Profile} />
			<Route path="*" component={Error} />
		</Switch>
	</Router>
);

export default Pages;
