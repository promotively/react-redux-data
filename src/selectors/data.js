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
 * Returns a reselect.js selector function to return the fetched data or undefined.
 *
 * @function
 * @param {string} id The ID for the data.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createDataSelector } from '@promotively/react-redux-data';
 *
 * const mapStateToProps = (state) => {
 *   const dataSelector = createDataSelector('billing');
 *
 *   return {
 *     data: dataSelector(state)
 *
 * ...
 */
export const createDataSelector = id =>
  createSelector(
    state => state.data[id]?.data || undefined,
    data => data
  );
