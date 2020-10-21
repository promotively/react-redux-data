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

export const Alert = props => {
  const { children, type } = props;

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        display: 'inline-block',
        fontSize: '14px',
        padding: '5px',
        ...(type === 'info'
          ? {
              background: '#e6f7ff',
              border: '1px solid #91d5ff'
            }
          : {}),
        ...(type === 'success'
          ? {
              background: '#f6ffed',
              border: '1px solid #b7eb8f'
            }
          : {}),
        ...(type === 'warn'
          ? {
              background: '#fffbe6',
              border: '1px solid #ffe58f'
            }
          : {}),
        ...(type === 'error'
          ? {
              background: '#fff1f0',
              border: '1px solid #ffa39e'
            }
          : {})
      }}
    >
      {children}
    </div>
  );
};
