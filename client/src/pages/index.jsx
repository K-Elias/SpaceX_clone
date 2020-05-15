import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Footer, PageContainer } from '../components';
import { UserContext } from '../App';
import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import Register from './register';
import Login from './login';
import Error from './error';

const Layout = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			<Fragment>
				<PageContainer>
					<Component {...props} />
				</PageContainer>
				<Footer />
			</Fragment>
		)}
	/>
);

const LogRoute = () => {
	const { user } = useContext(UserContext);
	return user.token ? <Redirect to="/launch" /> : <Login />;
};

const PrivateRoute = props => {
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		if (!user.token) {
			axios({
				method: 'POST',
				url: '/refresh_token',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			}).then(({ data: { token } }) => setUser({ ...user, token }));
		}
	}, []);

	return user.token ? <Layout {...props} /> : <Redirect to="/" />;
};

const Pages = () => {
	return (
		<Router>
			<Switch>
				<LogRoute exact path="/" component={Login} />
				<LogRoute path="/register" component={Register} />
				<PrivateRoute exact path="/launch" component={Launches} />
				<PrivateRoute path="/launch/:launchId" component={Launch} />
				<PrivateRoute path="/cart" component={Cart} />
				<PrivateRoute path="/profile" component={Profile} />
				<Route path="*" component={Error} />
			</Switch>
		</Router>
	);
};

Layout.propTypes = {
	component: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired
};

PrivateRoute.propTypes = {
	path: PropTypes.string.isRequired,
	component: PropTypes.func.isRequired
};

export default Pages;
