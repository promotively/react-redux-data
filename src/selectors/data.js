/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/**
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function to return the fetched data or undefined.
 * @function
 * @param {String} id The ID for the data.
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
const createDataSelector = (id) => createSelector(
  (state) => (
    (state.data[id] && state.data[id].data) || undefined
  ),
  (data) => (
    data
  )
);

export default createDataSelector;
