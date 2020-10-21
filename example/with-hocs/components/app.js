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
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 * @see {@link https://github.com/axios/axios}
 */

/* eslint-disable react/prop-types */

import React from 'react';
import { createFormValuesSelector, Form, Input } from '@promotively/react-redux-form';
import { connect as withRedux } from 'react-redux';
import { createDataSelector, createDataLoadingSelector, createDataErrorSelector, Data, fetchData } from '../../../src';
import { fetchUsers } from '../../common/helpers/data';
import { Form as CustomForm } from '../../common/components/form';
import { Input as CustomInput } from '../../common/components/input';
import { Button } from '../../common/components/button';
import { Alert } from '../../common/components/alert';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableBodyRowCell
} from '../../common/components/table';

const dataId = 'users';
const formId = 'search';
const inputId = 'keywords';

const mapStateToProps = (state, props) => {
  const formValuesSelector = createFormValuesSelector(formId, inputId);
  const dataSelector = createDataSelector(dataId);
  const dataLoadingSelector = createDataLoadingSelector(dataId);
  const dataErrorSelector = createDataErrorSelector(dataId);

  return {
    data: dataSelector(state, props),
    error: dataErrorSelector(state, props),
    loading: dataLoadingSelector(state, props),
    query: formValuesSelector(state, props) || props.query
  };
};

const mapDispatchToProps = { fetchData };

export const App = withRedux(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  const { data, error, loading, query } = props;

  return (
    <>
      <Data destroy={false} id="users" query={query} refresh={60000} source={fetchUsers} />
      <div
        style={{
          border: '1px solid #000',
          borderRadius: '4px',
          fontSize: '14px',
          padding: '10px'
        }}
      >
        <div style={{ display: 'flex', position: 'relative' }}>
          <Form component={CustomForm} id="search">
            <Input component={CustomInput} id="keywords" placeholder="Keywords..." />
            <Button>Search</Button>
          </Form>
          <div style={{ marginLeft: '5px' }}>
            {loading ? (
              <Alert>Loading, Please Wait...</Alert>
            ) : error ? (
              <Alert type="error">{error}</Alert>
            ) : (
              <Alert type={data.length > 0 ? 'success' : 'error'}>Found {data.length} users.</Alert>
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
        {!loading && data?.length ? (
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
                {data.map(user => (
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
      </div>
    </>
  );
});

App.defaultProps = {
  data: [],
  query: {
    keywords: ''
  }
};
