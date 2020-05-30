import { render } from 'react-dom';
import React from 'react';

import App from './App';
import Pages from './pages/index';
import GlobalStyle from './lib/styles';
import register from './lib/registerServiceWorker';

const app = document.getElementById('app');

if (app) {
	render(
		<App>
			<GlobalStyle />
			<Pages />
		</App>,
		app
	);
} else throw new Error('Error: check public/index.html file');

register();
