/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import { Provider } from 'react-redux';
import React from 'react';
import UsersContainer from './containers/users';

const createReactApp = (store) => (
  <Provider store={store}>
    <UsersContainer />
  </Provider>
);

export default createReactApp;
