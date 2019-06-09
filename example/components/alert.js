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

const Alert = (props) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid #ccc',
      display: 'inline-block',
      fontSize: '14px',
      padding: '5px',
      ...props.type === 'info' ? {
        background: '#e6f7ff',
        border: '1px solid #91d5ff'
      } : {},
      ...props.type === 'success' ? {
        background: '#f6ffed',
        border: '1px solid #b7eb8f'
      } : {},
      ...props.type === 'warn' ? {
        background: '#fffbe6',
        border: '1px solid #ffe58f'
      } : {},
      ...props.type === 'error' ? {
        background: '#fff1f0',
        border: '1px solid #ffa39e'
      } : {}
    }}
  >
    {props.children}
  </div>
);

export default Alert;
