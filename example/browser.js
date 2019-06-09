/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import { hydrate, render } from 'react-dom';
import App from './components/app';
import createReduxStore from './store';
import { Provider } from 'react-redux';
import React from 'react';

// document.domain is never defined when opening files locally on the filesystem.
const isSSR = document && document.domain;

const state = window.REDUX_INITIAL_STATE;
const store = createReduxStore(state);
const app = (
  <Provider store={store}>
    <App platform={isSSR ? 'server' : 'client'} />
  </Provider>
);

const [ node ] = document.getElementsByTagName('main');

if (isSSR) {
  hydrate(app, node);
} else {
  render(app, node);
}
