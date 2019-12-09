/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

import configureMockStore from 'redux-mock-store';
import { DATA_COMPLETE } from 'actions/data';
import DataProvider from 'containers/data-provider';
import hydrateStore from 'utils/hydrate';
import { Provider } from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';
import withData from 'helpers/with-data';

const dataId = 'test-data';
const mockData = { test: true };
const MockComponent = props => props.children || 'test';
const createMockStore = configureMockStore([thunk]);
const mockError = new Error('test-error');
const createMockPromise = () => Promise.resolve(mockData);
const createMockPromiseWithError = () => Promise.reject(mockError);

describe('utils/hydrate.js', () => {
  it('should handle saving data to the store when a promise is resolved.', async () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {}
    });
    const data = [];
    const app = (
      <Provider store={mockStore}>
        <DataProvider context={data}>
          <DataContainer />
        </DataProvider>
      </Provider>
    );

    await hydrateStore(app, mockStore, data);
    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({
      data: mockData,
      id: dataId,
      type: DATA_COMPLETE
    });
  });

  it('should return the correct response when all promises are resolved.', async () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {}
    });
    const data = [];
    const app = (
      <Provider store={mockStore}>
        <DataProvider context={data}>
          <DataContainer />
        </DataProvider>
      </Provider>
    );
    const result = await hydrateStore(app, mockStore, data);

    expect(result).toEqual({ [dataId]: mockData });
  });

  it('should handle errors when fetching data if a promise is rejected.', async () => {
    const DataContainer = withData(dataId, createMockPromiseWithError)(MockComponent);
    const mockStore = createMockStore({
      data: {}
    });
    const data = [];
    const app = (
      <Provider store={mockStore}>
        <DataProvider context={data}>
          <DataContainer />
        </DataProvider>
      </Provider>
    );

    let nextError = null;
    try {
      await hydrateStore(app, mockStore, data);
    } catch (error) {
      nextError = error;
    }

    expect(nextError).toEqual(mockError);
  });
});
