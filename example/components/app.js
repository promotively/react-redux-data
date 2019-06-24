/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import Header from '../components/header';
import React from 'react';
import UsersContainer from '../containers/users';

const App = () => (
  <React.Fragment>
    <Header />
    <UsersContainer />
  </React.Fragment>
);

export default App;
