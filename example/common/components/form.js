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

export const Form = props => {
  const {
    complete,
    component,
    destroy,
    dirty,
    disabled,
    error,
    focus,
    loading,
    ready,
    render,
    touched,
    validate,
    values,
    ...formProps
  } = props;

  return (
    <form
      style={{
        display: 'inline-block',
        margin: 0
      }}
      {...formProps}
    />
  );
};
