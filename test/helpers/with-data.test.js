/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

import configureMockStore from 'redux-mock-store';
import { DATA_LOADING } from 'actions/data';
import DataProvider from 'containers/data-provider';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import withData from 'helpers/with-data';

const dataId = 'test-data';
const mockData = { test: true };
const MockComponent = props => props.children || 'test';
const createMockStore = configureMockStore([thunk]);
const createMockPromise = () => Promise.resolve(mockData);

describe('helpers/with-data.js', () => {
  it('should fetch data when the store is empty.', () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {}
    });

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <DataContainer />
      </Provider>
    );

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: dataId,
      type: DATA_LOADING
    });
  });

  it('should not fetch data when the store is not empty.', () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {
        [dataId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    });

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <DataContainer />
      </Provider>
    );

    const actions = mockStore.getActions();

    expect(actions).toHaveLength(0);
  });

  it('should pass props through to child component.', () => {
    const mockState = {
      data: {
        [dataId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    };
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore(mockState);
    const props = { test: true };
    const renderer = ReactTestRenderer.create(
      <Provider store={mockStore}>
        <DataContainer test />
      </Provider>
    );
    const container = renderer.root;

    expect(container.findAllByProps(props)[0].props).toEqual(props);
  });

  it('should add the data promise into the data context if <DataProvider /> is an ancestor in the tree.', () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {}
    });
    const dataContext = [];

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <DataProvider context={dataContext}>
          <DataContainer />
        </DataProvider>
      </Provider>
    );

    expect(dataContext[0].id).toEqual(dataId);
  });
});
