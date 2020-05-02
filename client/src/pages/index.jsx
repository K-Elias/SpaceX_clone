import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { Fragment } from 'react';
import gql from 'graphql-tag';

import { Footer, PageContainer } from '../components';
import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import Register from './register';
import Login from './login';
import Error from './error';

const IS_LOGGED_IN = gql`
	query IsUserLoggedIn {
		isLoggedIn @client
	}
`;

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
		data: { isLoggedIn }
	} = useQuery(IS_LOGGED_IN);
	return isLoggedIn ? <Layout {...props} /> : <Redirect to="/" />;
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
