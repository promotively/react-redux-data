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
 * @module containers
 *
 * @see {@link https://github.com/facebook/react}
 */

/* eslint-disable react/prop-types */

import React from 'react';
import { DataContext } from 'helpers/data-context';

/**
 * @typedef DataProviderProps
 * @type {object}
 * @property {Array} context The external data array used by the data provider.
 * @property {object | Array} children Any react.js child components to render.
 */

/**
 * Enable any child withData higher order components to push their data
 * properties to a central store. (useful for server side rendering)
 *
 * @function
 * @param {object} props The props for this component.
 * @returns {object} React JSX to render the data provider and child components.
 * @example
 * ...
 *
 * import {
 *   DataProvider,
 *   dataReducer
 * } from '@promotively/react-redux-data';
 *
 * server.get('/', (req, res) => {
 *   const store = createStore(dataReducer);
 *   const data = {};
 *   const app = (
 *     <Provider store={store}>
 *       <DataProvider context={data}>
 *         <App />
 *       </DataProvider>
 *     </Provider>
 *   );
 *
 * ...
 */
export const DataProvider = props => (
  <DataContext.Provider value={props.context}>{props.children}</DataContext.Provider>
);
