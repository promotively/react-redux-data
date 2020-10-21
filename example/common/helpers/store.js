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
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from '@promotively/react-redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { dataReducer } from '../../../src';

const logger = createLogger();

export const createReduxStore = initialState =>
  createStore(
    combineReducers({
      data: dataReducer,
      form: formReducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(...[logger, thunk]))
  );
