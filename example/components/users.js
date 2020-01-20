/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableBodyRowCell } from './table';
import Alert from './alert';
import React from 'react';
import SearchFormContainer from '../containers/search-form';
import Wrapper from './wrapper';

const Users = props => (
  <Wrapper>
    <div style={{ display: 'flex', position: 'relative' }}>
      <SearchFormContainer
        id="search"
        action={props.fetchData}
        promise={props.action}
        dispatch={props.dispatch}
        keywords={props.keywords}
      />
      <div style={{ marginLeft: '5px' }}>
        {props.loading ? (
          <Alert>Loading, Please Wait...</Alert>
        ) : props.error ? (
          <Alert type="error">{props.error}</Alert>
        ) : (
          <Alert type={props.data.length > 0 ? 'success' : 'error'}>Found {props.data.length} users.</Alert>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <Alert>
          The form functionality is implemented using{' '}
          <a href="https://github.com/promotively/react-redux-form">@promotively/react-redux-form</a>.
        </Alert>
      </div>
    </div>
    {!props.loading && props.data?.length ? (
      <div style={{ marginTop: '10px' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell width="10%">ID</TableHeaderCell>
              <TableHeaderCell width="30%">Name</TableHeaderCell>
              <TableHeaderCell width="20%">Points</TableHeaderCell>
              <TableHeaderCell width="20%">Date Of Birth</TableHeaderCell>
              <TableHeaderCell width="20%">Gender</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map(user => (
              <TableRow key={user.id}>
                <TableBodyRowCell>{user.id}</TableBodyRowCell>
                <TableBodyRowCell>{user.name}</TableBodyRowCell>
                <TableBodyRowCell>{user.points === 0 ? <em>No points earned.</em> : user.points}</TableBodyRowCell>
                <TableBodyRowCell>{user.dob}</TableBodyRowCell>
                <TableBodyRowCell>{user.gender === 'M' ? 'Male' : 'Female'}</TableBodyRowCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : null}
  </Wrapper>
);

Users.defaultProps = {
  data: []
};

export default Users;
