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
 */

/* eslint-disable react/prop-types */

import React from 'react';

export const Button = props => (
  <button
    style={{
      background: '#000',
      border: '1px solid #000',
      borderRadius: '4px',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '5px'
    }}
    {...props}
  />
);

Button.defaultProps = {
  type: 'submit'
};
