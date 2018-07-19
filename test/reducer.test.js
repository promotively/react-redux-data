import { DATA_FETCH_LOADING, DATA_FETCH_COMPLETE, DATA_FETCH_ERROR, DATA_FETCH_CLEAR } from '../lib/actions';
import dataReducer from '../lib/reducer';

describe('lib/reducer.js', () => {
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

  it('should handle DATA_FETCH_LOADING action type.', () => {
    const nextState = {
      ...previousState,
      test: {
        data: null,
        error: null,
        loading: true
      }
    };

    expect(dataReducer(previousState, {
      key: 'test',
      type: DATA_FETCH_LOADING
    })).toEqual(nextState);
  });

  it('should handle DATA_FETCH_ERROR action type.', () => {
    const nextState = {
      ...previousState,
      test: {
        data: null,
        error: 'error',
        loading: false
      }
    };

    expect(dataReducer(previousState, {
      error: 'error',
      key: 'test',
      type: DATA_FETCH_ERROR
    })).toEqual(nextState);
  });

  it('should handle DATA_FETCH_COMPLETE action type.', () => {
    const nextState = {
      ...previousState,
      test: {
        data: {},
        error: null,
        loading: false
      }
    };

    expect(dataReducer(previousState, {
      data: {},
      key: 'test',
      type: DATA_FETCH_COMPLETE
    })).toEqual(nextState);
  });

  it('should handle DATA_FETCH_CLEAR action type.', () => {
    const currentState = {
      ...previousState,
      test: {
        data: {},
        error: null,
        loading: false
      }
    };

    expect(dataReducer(currentState, {
      key: 'test',
      type: DATA_FETCH_CLEAR
    })).toEqual(previousState);
  });
});
