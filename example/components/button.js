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

const Button = props => (
  <button
    style={{
      background: '#000',
      border: '1px solid #000',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '5px'
    }}
    {...props}
  />
);

export default Button;
