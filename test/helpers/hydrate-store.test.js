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

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';
import { hydrateStore } from 'helpers/hydrate-store';
import { withData } from 'helpers/with-data';
import { DataProvider } from 'containers/data-provider';
import { DATA_COMPLETE } from 'actions/data';

const dataId = 'test-data';
const mockData = { test: true };
const mockQuery = {};
const MockComponent = props => props.children || 'test';
const createMockStore = configureMockStore([thunk]);
const mockError = new Error('test-error');
const createMockPromise = () => Promise.resolve(mockData);
const createMockPromiseWithError = () => Promise.reject(mockError);
const Data = withData(MockComponent);

describe('helpers/hydrate-store.js', () => {
  it('should handle saving data to the store when a promise is resolved.', async () => {
    const mockStore = createMockStore({ data: {} });
    const data = [];
    const app = (
      <Provider store={mockStore}>
        <DataProvider context={data}>
          <Data id={dataId} source={createMockPromise} />
        </DataProvider>
      </Provider>
    );

    await hydrateStore(app, mockStore, data);
    const actions = mockStore.getActions();

    expect(actions[1]).toEqual({ data: mockData, id: dataId, query: mockQuery, type: DATA_COMPLETE });
  });

  it('should return the correct response when all promises are resolved.', async () => {
    const mockStore = createMockStore({ data: {} });
    const data = [];
    const app = (
      <Provider store={mockStore}>
        <DataProvider context={data}>
          <Data id={dataId} source={createMockPromise} />
        </DataProvider>
      </Provider>
    );
    const result = await hydrateStore(app, mockStore, data);

    expect(result).toEqual({ [dataId]: mockData });
  });

  it('should handle errors when fetching data if a promise is rejected.', async () => {
    const mockStore = createMockStore({ data: {} });
    const data = [];
    const app = (
      <Provider store={mockStore}>
        <DataProvider context={data}>
          <Data id={dataId} source={createMockPromiseWithError} />
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
