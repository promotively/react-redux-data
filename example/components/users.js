/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import React from 'react';

const Users = (props) => (
  <div>
    <h1>react-redux-data Example</h1>
    <ul>
      {props.error ? <span>Error: {props.error}</span> : null}
      {props.loading ? <span>Loading, Please Wait...</span> : null}
      {props.data ? props.data.map((user) => (
        <li key={user.id}>{user.name}</li>
      )) : null}
    </ul>
  </div>
);

export default Users;
