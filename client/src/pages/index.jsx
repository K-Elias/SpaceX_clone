import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import React, { Fragment, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Footer, PageContainer, Loading } from '../components';
import { refreshToken } from '../lib/auth';
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

const PrivateRoute = props => {
	const { token } = useContext(UserContext);
	return token ? <Layout {...props} /> : <Redirect to="/login" />;
};

const Pages = () => {
	const { setToken } = useContext(UserContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		refreshToken()
			.then(({ data }) => {
				setToken(data.token);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	if (loading) return <Loading />;

	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
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
	path: PropTypes.string.isRequired,
	component: PropTypes.func.isRequired
};

PrivateRoute.propTypes = {
	path: PropTypes.string.isRequired,
	component: PropTypes.func.isRequired
};

export default Pages;
