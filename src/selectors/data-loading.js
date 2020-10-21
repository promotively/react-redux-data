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
 * @module selectors
 *
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function to get the current data loading state.
 *
 * @function
 * @param {string} id The ID for the data.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createDataLoadingSelector } from '@promotively/react-redux-data';
 *
 * const mapStateToProps = (state) => {
 *   const dataLoadingSelector = createDataLoadingSelector('billing');
 *
 *   return {
 *     loading: dataLoadingSelector(state)
 *
 * ...
 */
export const createDataLoadingSelector = id =>
  createSelector(
    state => (typeof state.data[id]?.loading === 'boolean' ? state.data[id]?.loading : true),
    loading => loading
  );
