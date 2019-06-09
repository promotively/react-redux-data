/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { formReducer, formInputReducer } from '@promotively/react-redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { dataReducer } from '../src';
import thunk from 'redux-thunk';

const createReduxStore = (initialState) => createStore(
  combineReducers({
    data: dataReducer,
    form: formReducer,
    formInput: formInputReducer
  }),
  initialState,
  composeWithDevTools(applyMiddleware(...[ thunk ]))
);

export default createReduxStore;
