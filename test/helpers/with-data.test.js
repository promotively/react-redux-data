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

import mockConsole from 'jest-mock-console';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { act, create } from 'react-test-renderer';
import thunk from 'redux-thunk';
import { withData } from 'helpers/with-data';
import { DataProvider } from 'containers/data-provider';
import { DATA_LOADING, DATA_DESTROY } from 'actions/data';

const mockId = 'test-data';
const mockData = { test: true };
const mockQuery = { test: true };
const MockComponent = props => props.children || 'test';
const createMockStore = configureMockStore([thunk]);
const createMockPromise = () => Promise.resolve(mockData);
const Data = withData(MockComponent);

jest.useFakeTimers();

describe('helpers/with-data.js', () => {
  it('should throw an error when the data identifier is undefined.', () => {
    const restoreConsole = mockConsole();
    const mockState = { data: {} };
    const mockStore = createMockStore(mockState);

    try {
      act(() => {
        create(
          <Provider store={mockStore}>
            <Data source={createMockPromise} />
          </Provider>
        );
      });
    } catch (error) {
      expect(error.message).toEqual('No data identifier.');
    }

    restoreConsole();
  });

  it('should throw an error when the data source is undefined.', () => {
    const restoreConsole = mockConsole();
    const mockState = { data: {} };
    const mockStore = createMockStore(mockState);

    try {
      act(() => {
        create(
          <Provider store={mockStore}>
            <Data id={mockId} />
          </Provider>
        );
      });
    } catch (error) {
      expect(error.message).toEqual('No data source.');
    }

    restoreConsole();
  });

  it('should fetch data when the store is empty.', () => {
    const mockState = { data: {} };
    const mockStore = createMockStore(mockState);

    act(() => {
      create(
        <Provider store={mockStore}>
          <Data id={mockId} source={createMockPromise} />
        </Provider>
      );
    });

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();
    expect(actions[0]).toEqual({ id: mockId, query: {}, type: DATA_LOADING });
  });

  it('should not fetch data when the store is not empty.', () => {
    const mockState = {
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    };
    const mockStore = createMockStore(mockState);

    act(() => {
      create(
        <Provider store={mockStore}>
          <Data id={mockId} source={createMockPromise} />
        </Provider>
      );
    });

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();

    expect(actions).toHaveLength(0);
  });

  it('should not push data to the data provider if the id is a duplicate.', () => {
    const mockState = {
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    };
    const mockStore = createMockStore(mockState);
    const data = [{ id: mockId, query: {}, source: createMockPromise }];

    act(() => {
      create(
        <Provider store={mockStore}>
          <DataProvider context={data}>
            <Data id={mockId} source={createMockPromise} />
          </DataProvider>
        </Provider>
      );
    });

    expect(data).toHaveLength(1);
  });

  it('should refetch data when the query object changes.', () => {
    const mockState = {
      data: {
        [mockId]: {}
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Data id={mockId} source={createMockPromise} />
        </Provider>
      );
    });

    act(() => {
      renderer.update(
        <Provider store={mockStore}>
          <Data id={mockId} query={mockQuery} source={createMockPromise} />
        </Provider>
      );
    });

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();

    expect(actions).toHaveLength(2);
  });

  it('should not refetch data when the query object has not changed.', () => {
    const mockState = {
      data: {
        [mockId]: {}
      }
    };
    const mockStore = createMockStore(mockState);
    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Data id={mockId} query={mockQuery} source={createMockPromise} />
        </Provider>
      );
    });

    act(() => {
      renderer.update(
        <Provider store={mockStore}>
          <Data id={mockId} query={mockQuery} source={createMockPromise} />
        </Provider>
      );
    });

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();

    expect(actions).toHaveLength(1);
  });

  it('should refresh data if refresh prop is defined.', () => {
    const mockState = {
      data: {
        [mockId]: {}
      }
    };
    const mockStore = createMockStore(mockState);
    act(() => {
      create(
        <Provider store={mockStore}>
          <Data id={mockId} query={mockQuery} refresh={60000} source={createMockPromise} />
        </Provider>
      );
    });

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(2);
  });

  it('should add the data promise into the data context if <DataProvider /> is an ancestor in the tree.', () => {
    const mockState = { data: {} };
    const mockStore = createMockStore(mockState);
    const dataContext = [];

    act(() => {
      create(
        <Provider store={mockStore}>
          <DataProvider context={dataContext}>
            <Data id={mockId} source={createMockPromise} />
          </DataProvider>
        </Provider>
      );
    });

    jest.runOnlyPendingTimers();

    expect(dataContext[0].id).toEqual(mockId);
  });

  it(`should remove fetched data when the container component unmounts if
  params.destroy is set to true (this is the default behaviour).`, () => {
    const mockState = {
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    };
    const mockStore = createMockStore(mockState);

    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Data id={mockId} source={createMockPromise} />
        </Provider>
      );
    });

    renderer.unmount();

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: mockId,
      type: DATA_DESTROY
    });
  });

  it('should not remove fetched data when the container component unmounts if params.destroy is set to false.', () => {
    const mockState = {
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    };
    const mockStore = createMockStore(mockState);

    let renderer = null;
    act(() => {
      renderer = create(
        <Provider store={mockStore}>
          <Data destroy={false} id={mockId} source={createMockPromise} />
        </Provider>
      );
    });

    renderer.unmount();

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(0);
  });
});
