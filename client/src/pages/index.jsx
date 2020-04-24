import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';

import { Footer, PageContainer } from '../components';
import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import Login from './login';

const IS_LOGGED_IN = gql`
	query IsUserLoggedIn {
		isLoggedIn @client
	}
`;

const PrivateRoute = props => {
	const {
		data: { isLoggedIn }
	} = useQuery(IS_LOGGED_IN);
	return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

const Pages = () => (
	<Router>
		<PageContainer>
			<Switch>
				<Route path="/login" component={Login} />
				<PrivateRoute exact path="/" component={Launches} />
				<PrivateRoute path="/launch/:launchId" component={Launch} />
				<PrivateRoute path="/cart" component={Cart} />
				<PrivateRoute path="/profile" component={Profile} />
			</Switch>
		</PageContainer>
		<Footer />
	</Router>
);

export default Pages;
