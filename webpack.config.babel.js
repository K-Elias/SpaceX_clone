import '@babel/register';

let config = '';

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./config/webpack.prod');
    break;

  case 'development':
    config = require('./config/webpack.dev');
    break;
}

export default config;
