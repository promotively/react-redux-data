/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/**
 * @see {@link https://github.com/reduxjs/redux}
 */

import { DATA_LOADING, DATA_COMPLETE, DATA_ERROR, DATA_REMOVE } from 'actions/data';
import clone from 'clone';

/**
 * Initial state used for the first time the redux.js reducer function is called.
 * @constant
 * @type {Object}
 */
const initialState = {};

/**
 * The redux.js reducer function to handle any state mutations that are required during data fetching.
 * @function
 * @param {Object} state The current state inside the redux.js store.
 * @param {Object} action The last redux.js action that was dispatched.
 * @returns {Object} Deep clone of the existing state of the store with any mutations related to data fetching.
 */
const dataReducer = (state = initialState, action) => {
  const { id } = action;

  switch (action.type) {
    case DATA_LOADING: {
      const newState = clone(state);

      newState[id] = {
        ...newState[id],
        data: null,
        error: null,
        loading: true
      };

      return newState;
    }
    case DATA_ERROR: {
      const newState = clone(state);

      newState[id] = {
        data: null,
        error: action.error,
        loading: false
      };

      return newState;
    }
    case DATA_COMPLETE: {
      const newState = clone(state);

      newState[id] = {
        data: action.data,
        error: null,
        loading: false
      };

      return newState;
    }
    case DATA_REMOVE: {
      const newState = clone(state);

      delete newState[id];

      return newState;
    }
    default:
      return state;
  }
};

export default dataReducer;
