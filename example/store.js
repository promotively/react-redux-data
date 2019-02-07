/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { dataReducer } from '../src/index';
import thunk from 'redux-thunk';

const createReduxStore = (initialState) => createStore(
  combineReducers({ data: dataReducer }),
  initialState,
  applyMiddleware(...[ thunk ])
);

export default createReduxStore;
