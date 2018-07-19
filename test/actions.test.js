import { DATA_FETCH_CLEAR, DATA_FETCH_COMPLETE, DATA_FETCH_ERROR, DATA_FETCH_LOADING, clearData, fetchData } from '../lib/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([ thunk ]);

describe('lib/actions.js', () => {
  const key = 'test';

  it('should handle fetching data using fetch.', async () => {
    const store = mockStore();
    const data = {
      test: true
    };
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => (data)
      })
    );

    await store.dispatch(fetchData('test', mockFetch));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      key,
      type: DATA_FETCH_LOADING
    });

    expect(actions[1]).toEqual({
      data,
      key,
      type: DATA_FETCH_COMPLETE
    });
  });

  it('should handle fetching data using axios or other standard promises.', async () => {
    const store = mockStore();
    const data = {
      test: true
    };
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve(data)
    );

    await store.dispatch(fetchData('test', mockFetch));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      key,
      type: DATA_FETCH_LOADING
    });

    expect(actions[1]).toEqual({
      data,
      key,
      type: DATA_FETCH_COMPLETE
    });
  });

  it('should handle mapping fetched data.', async () => {
    const store = mockStore();
    const initialData = [{
      test: true
    }, {
      test: false
    }];
    const mappedData = [{
      test: true
    }, {
      test: true
    }];
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => (initialData)
      })
    );
    const mapData = (data) => (
      data.map((item) => (
        !item.test ? { test: true } : item
      ))
    );

    await store.dispatch(fetchData('test', mockFetch, mapData));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      key,
      type: DATA_FETCH_LOADING
    });

    expect(actions[1]).toEqual({
      data: mappedData,
      key,
      type: DATA_FETCH_COMPLETE
    });
  });

  it('should handle errors when fetching data.', async () => {
    const store = mockStore();
    const error = {
      message: 'error'
    };
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.reject(error)
    );

    await store.dispatch(fetchData('test', mockFetch));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      key,
      type: DATA_FETCH_LOADING
    });

    expect(actions[1]).toEqual({
      error: 'error',
      key,
      type: DATA_FETCH_ERROR
    });
  });

  it('should clear fetched data', () => {
    expect(clearData(key)).toEqual({
      key,
      type: DATA_FETCH_CLEAR
    });
  });
});
