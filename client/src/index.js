import 'bpk-stylesheets';
import React from 'react';
import ReactDOM from 'react-dom';

require('intersection-observer');

// eslint-disable-next-line import/first
import App from './App';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
