/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import {
  DATA_LOADING,
  DATA_COMPLETE,
  DATA_ERROR,
  DATA_REMOVE
} from 'actions/data';
import clone from 'clone';

/**
 * Initial state used for the first time the reducer function is called.
 * @constant
 * @type {object}
 */
const initialState = {};

/**
 * Reducer function to handle the state mutations that happen during the data fetching lifecycle.
 * @function
 * @param {object} state The current state of the store.
 * @param {object} action The action that was dispatched.
 *
 * @returns {object} Deep clone of the existing state of the store with any mutations from the data fetching lifecycle.
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
