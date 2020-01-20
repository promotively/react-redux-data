/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

import { DATA_COMPLETE, DATA_ERROR, DATA_LOADING, DATA_REMOVE } from 'actions/data';
import dataReducer from 'reducers/data';

const dataId = 'test';
const mockData = { test: true };
const mockError = new Error('test-error');

describe('reducers/data.js', () => {
  const initialState = {};
  const previousState = {
    data: {
      data: [],
      error: null,
      loading: false
    }
  };

  it('should not mutate state when action type is not found in the reducer.', () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle DATA_LOADING action type.', () => {
    const nextState = {
      ...previousState,
      test: {
        error: null,
        loading: true
      }
    };

    expect(
      dataReducer(previousState, {
        id: dataId,
        type: DATA_LOADING
      })
    ).toEqual(nextState);
  });

  it('should handle DATA_ERROR action type.', () => {
    const nextState = {
      ...previousState,
      test: {
        data: null,
        error: mockError.message,
        loading: false
      }
    };

    expect(
      dataReducer(previousState, {
        error: mockError.message,
        id: dataId,
        type: DATA_ERROR
      })
    ).toEqual(nextState);
  });

  it('should handle DATA_COMPLETE action type.', () => {
    const nextState = {
      ...previousState,
      [dataId]: {
        data: mockData,
        error: null,
        loading: false
      }
    };

    expect(
      dataReducer(previousState, {
        data: mockData,
        id: dataId,
        type: DATA_COMPLETE
      })
    ).toEqual(nextState);
  });

  it('should handle DATA_REMOVE action type.', () => {
    const currentState = {
      ...previousState,
      [dataId]: {
        data: mockData,
        error: null,
        loading: false
      }
    };

    expect(
      dataReducer(currentState, {
        id: dataId,
        type: DATA_REMOVE
      })
    ).toEqual(previousState);
  });
});
