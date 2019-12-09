/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import Header from '../components/header';
import PropTypes from 'prop-types';
import React from 'react';
import UsersContainer from '../containers/users';

const App = props => (
  <>
    <Header platform={props.platform} />
    <UsersContainer />
  </>
);

App.propTypes = {
  platform: PropTypes.string.isRequired
};

export default App;
