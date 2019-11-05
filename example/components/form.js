/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import React from 'react';

const Form = (props) => (
  <form
    style={{
      display: 'inline-block',
      margin: 0
    }}
    onSubmit={props.onSubmit}
  >
    {props.children}
  </form>
);

export default Form;
