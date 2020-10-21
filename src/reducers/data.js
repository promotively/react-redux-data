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
 * @module reducers
 *
 * @see {@link https://github.com/reduxjs/redux}
 */

import clone from 'clone';
import { DATA_LOADING, DATA_COMPLETE, DATA_ERROR, DATA_DESTROY } from 'actions/data';

/**
 * Initial state used for the first time the redux.js reducer function is called.
 *
 * @constant
 * @type {object}
 */
const initialState = {};

/**
 * The redux.js reducer function to handle any state mutations that are required during data fetching.
 *
 * @function
 * @param {object} state The current state inside the redux.js store.
 * @param {object} action The last redux.js action that was dispatched.
 * @returns {object} Deep clone of the existing state of the store with any mutations related to data fetching.
 */
export const dataReducer = (state = initialState, action) => {
  const { data, error, id } = action;

  switch (action.type) {
    case DATA_LOADING: {
      const newState = clone(state);

      newState[id] = {
        ...newState[id],
        error: null,
        loading: true
      };

      return newState;
    }
    case DATA_ERROR: {
      const newState = clone(state);

      newState[id] = {
        data: null,
        error,
        loading: false
      };

      return newState;
    }
    case DATA_COMPLETE: {
      const newState = clone(state);

      newState[id] = {
        data,
        error: null,
        loading: false
      };

      return newState;
    }
    case DATA_DESTROY: {
      const newState = clone(state);

      delete newState[id];

      return newState;
    }
    default:
      return state;
  }
};
