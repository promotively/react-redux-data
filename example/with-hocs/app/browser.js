/**
 * promotively/react-redux-data
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-data}
 */

/**
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 */

import { Provider } from 'react-redux';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { App } from '../components/app';
import { Layout } from '../../common/components/layout';
import { createReduxStore } from '../../common/helpers/store';

// document.domain is never defined when opening files locally on the filesystem.
const isSSR = document?.domain;

const state = window.REDUX_INITIAL_STATE;
const store = createReduxStore(state);

window.REDUX_STORE = store;

const app = (
  <Provider store={store}>
    <Layout
      title={`promotively/react-redux-data Example (Using Higher Order Components${
        isSSR ? ' With Server Side Rendering' : ''
      })`}
    >
      <App />
    </Layout>
  </Provider>
);

const [node] = document.getElementsByTagName('main');

if (isSSR) {
  hydrate(app, node);
} else {
  render(app, node);
}
