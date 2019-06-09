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

const Wrapper = (props) => (
  <div
    style={{
      border: '1px solid #000',
      fontSize: '14px',
      padding: '10px'
    }}
  >
    {props.children}
  </div>
);

export default Wrapper;
