require('normalize.css');
require('./index.css');

import 'core-js';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('app'),
);
