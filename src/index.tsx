import 'core-js';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

function App(): React.ReactElement {
  return <h1>Hello World</h1>;
}

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('app'),
);
