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

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';

export const Input = props => {
  const {
    checked,
    complete,
    component,
    dirty,
    disabled,
    error,
    focus,
    formId,
    ready,
    render,
    touched,
    validate,
    ...inputProps
  } = props;

  return (
    <input
      style={{
        border: '1px solid #000',
        borderRadius: '4px',
        fontSize: '14px',
        marginRight: '5px',
        padding: '5px',
        width: '200px'
      }}
      {...inputProps}
    />
  );
};
