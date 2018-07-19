import { DATA_FETCH_LOADING, DATA_FETCH_COMPLETE, DATA_FETCH_ERROR, DATA_FETCH_CLEAR } from './actions';

const initialState = {};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_FETCH_LOADING:
      return {
        ...Object.keys(state)
          .filter((key) => key !== action.key)
          .reduce((result, key) => {
            result[key] = { ...state[key] };

            return result;
          }, {}),
        [action.key]: {
          data: null,
          error: null,
          loading: true
        }
      };
    case DATA_FETCH_ERROR:
      return {
        ...Object.keys(state)
          .filter((key) => key !== action.key)
          .reduce((result, key) => {
            result[key] = { ...state[key] };

            return result;
          }, {}),
        [action.key]: {
          data: null,
          error: action.error,
          loading: false
        }
      };
    case DATA_FETCH_COMPLETE:
      return {
        ...Object.keys(state)
          .filter((key) => key !== action.key)
          .reduce((result, key) => {
            result[key] = { ...state[key] };

            return result;
          }, {}),
        [action.key]: {
          data: action.data,
          error: null,
          loading: false
        }
      };
    case DATA_FETCH_CLEAR:
      return {
        ...Object.keys(state)
          .filter((key) => key !== action.key)
          .reduce((result, key) => {
            result[key] = { ...state[key] };

            return result;
          }, {})
      };
    default:
      return state;
  }
};

export default dataReducer;
