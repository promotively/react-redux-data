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

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import thunk from 'redux-thunk';
import { useData } from 'helpers/use-data';
import { DataProvider } from 'containers/data-provider';
import { DATA_LOADING, DATA_DESTROY } from 'actions/data';
import { isNode } from 'helpers/platform';

const mockId = 'test-data';
const mockData = { test: true };
const mockQuery = { test: true };
const createMockStore = configureMockStore([thunk]);
const createMockPromise = () => Promise.resolve(mockData);

jest.useFakeTimers();

jest.mock('helpers/platform', () => ({
  isNode: jest.fn()
}));

beforeEach(() => {
  isNode.mockImplementation(() => false);
});

describe('helpers/use-data.js', () => {
  it('should throw an error when the data identifier is undefined.', () => {
    const mockStore = createMockStore({ data: {} });

    try {
      renderHook(() => useData(), {
        wrapper: props => {
          const { children } = props;

          return <Provider store={mockStore}>{children}</Provider>;
        }
      });
    } catch (error) {
      expect(error.message).toEqual('No data identifier.');
    }
  });

  it('should throw an error when the data source is undefined.', () => {
    const mockStore = createMockStore({ data: {} });

    try {
      renderHook(() => useData(mockId), {
        wrapper: props => {
          const { children } = props;

          return <Provider store={mockStore}>{children}</Provider>;
        }
      });
    } catch (error) {
      expect(error.message).toEqual('No data source.');
    }
  });

  it('should fetch data when the store is empty.', () => {
    const mockStore = createMockStore({ data: {} });
    const mockOptions = { source: createMockPromise };

    renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return <Provider store={mockStore}>{children}</Provider>;
      }
    });

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({ id: mockId, query: {}, type: DATA_LOADING });
  });

  it('should not fetch data when the store is not empty.', () => {
    const mockStore = createMockStore({
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    });
    const mockOptions = { source: createMockPromise };

    renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return <Provider store={mockStore}>{children}</Provider>;
      }
    });

    const actions = mockStore.getActions();

    expect(actions).toHaveLength(0);
  });

  it('should not push data to the data provider if the id is a duplicate.', () => {
    const mockStore = createMockStore({
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    });
    const mockOptions = { source: createMockPromise };
    const dataContext = [{ id: mockId, query: {}, source: createMockPromise }];

    renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <DataProvider context={dataContext}>{children}</DataProvider>
          </Provider>
        );
      }
    });

    expect(dataContext).toEqual([{ id: mockId, query: {}, source: createMockPromise }]);
  });

  it('should refetch data when the query object changes.', () => {
    const mockStore = createMockStore({
      data: {
        [mockId]: {}
      }
    });
    const mockOptions = { source: createMockPromise };

    const renderer = renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return <Provider store={mockStore}>{children}</Provider>;
      }
    });

    mockOptions.query = mockQuery;

    renderer.rerender();

    const actions = mockStore.getActions();

    expect(actions.filter(action => action.type === DATA_LOADING)).toHaveLength(2);
  });

  it('should not refetch data when the query object has not changed.', () => {
    const mockStore = createMockStore({
      data: {
        [mockId]: {}
      }
    });
    const mockOptions = { query: mockQuery, source: createMockPromise };

    const renderer = renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return <Provider store={mockStore}>{children}</Provider>;
      }
    });

    renderer.rerender();

    const actions = mockStore.getActions();

    expect(actions.filter(action => action.type === DATA_LOADING)).toHaveLength(1);
  });

  it('should refresh data if refresh option is defined.', () => {
    const mockStore = createMockStore({
      data: {}
    });
    const mockOptions = { query: mockQuery, refresh: 60000, source: createMockPromise };

    renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return <Provider store={mockStore}>{children}</Provider>;
      }
    });

    jest.runOnlyPendingTimers();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(2);
  });

  it('should add the data promise into the data context if <DataProvider /> is an ancestor in the tree.', () => {
    const mockStore = createMockStore({ data: {} });
    const mockOptions = { source: createMockPromise };
    const dataContext = [];

    isNode.mockImplementation(() => true);

    renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <DataProvider context={dataContext}>{children}</DataProvider>
          </Provider>
        );
      }
    });

    expect(dataContext[0].id).toEqual(mockId);
  });

  it('should not add the data promise into the data context if it already exists.', () => {
    const mockStore = createMockStore({
      data: {
        [mockId]: {
          data: mockData,
          error: null,
          loading: false
        }
      }
    });
    const mockOptions = { source: createMockPromise };
    const dataContext = [
      {
        id: mockId,
        query: {},
        source: createMockPromise
      }
    ];

    isNode.mockImplementation(() => true);

    renderHook(() => useData(mockId, mockOptions), {
      wrapper: props => {
        const { children } = props;

        return (
          <Provider store={mockStore}>
            <DataProvider context={dataContext}>{children}</DataProvider>
          </Provider>
        );
      }
    });

    expect(dataContext.length).toEqual(1);
  });

  it(`should remove fetched data when the container component unmounts if
  params.destroy is set to true (this is the default behaviour).`, () => {
    const mockStore = createMockStore({
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    });

    const renderer = renderHook(() => useData(mockId, { source: createMockPromise }), {
      wrapper: props => {
        const { children } = props;

        return <Provider store={mockStore}>{children}</Provider>;
      }
    });

    renderer.unmount();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: mockId,
      type: DATA_DESTROY
    });
  });

  it('should not remove fetched data when the container component unmounts if params.destroy is set to false.', () => {
    const mockStore = createMockStore({
      data: {
        [mockId]: {
          data: [mockData],
          error: null,
          loading: false
        }
      }
    });

    const renderer = renderHook(() => useData(mockId, { destroy: false, source: createMockPromise }), {
      wrapper: props => {
        const { children } = props;

        return <Provider store={mockStore}>{children}</Provider>;
      }
    });

    renderer.unmount();

    const actions = mockStore.getActions();

    expect(actions.length).toEqual(0);
  });
});
