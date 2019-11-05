/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/**
 * @see {@link https://github.com/facebook/react}
 */

/* eslint-disable react/prop-types */

import DataContext from 'helpers/data-context';
import React from 'react';

/**
 * Enable any child withData higher order components to push their data properties to a central store. (useful for server side rendering)
 * @function
 * @param {Object} props The props for this component.
 * @returns {Object} React JSX to render the data provider and child components.
 * @example
 * ...
 *
 * import { DataProvider, dataReducer, hydrateStore } from '@promotively/react-redux-data';
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
const DataProvider = (props) => (
  <DataContext.Provider value={props.context}>
    {props.children}
  </DataContext.Provider>
);

export default DataProvider;
