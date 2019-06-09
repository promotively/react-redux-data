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

const FormInput = (props) => (
  <input
    style={{
      border: '1px solid #000',
      fontSize: '14px',
      marginRight: '5px',
      padding: '5px',
      width: '200px'
    }}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
  />
);

export default FormInput;
