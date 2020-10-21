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

export const Table = props => (
  <table
    cellPadding={0}
    cellSpacing={0}
    style={{
      border: '1px solid #000',
      borderBottom: 0,
      borderRadius: '4px',
      width: '100%'
    }}
    {...props}
  />
);

export const TableHeader = props => <thead {...props} />;

export const TableHeaderCell = props => (
  <th
    style={{
      background: '#000',
      borderBottom: '1px solid #000',
      color: '#fff',
      padding: '5px',
      textAlign: 'left'
    }}
    {...props}
  />
);

export const TableBody = props => <tbody {...props} />;

export const TableRow = props => <tr {...props} />;

export const TableBodyRowCell = props => (
  <td
    style={{
      borderBottom: '1px solid #000',
      padding: '5px'
    }}
    {...props}
  />
);
