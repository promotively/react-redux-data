/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/**
 * @see {@link https://github.com/reduxjs/reselect}
 */

import { createSelector } from 'reselect';

/**
 * Returns a reselect.js selector function to get the current data error state or return an empty string.
 * @function
 * @param {String} id The ID for the data.
 * @returns {Function} A reselect.js selector function.
 * @example
 * ...
 *
 * import { createDataErrorSelector } from '@promotively/react-redux-data';
 *
 * const mapStateToProps = (state) => {
 *   const dataErrorSelector = createDataErrorSelector('billing');
 *
 *   return {
 *     error: dataErrorSelector(state)
 *
 * ...
 */
const createDataErrorSelector = (id) => createSelector(
  (state) => (
    (state.data[id] && state.data[id].error) || ''
  ),
  (error) => (
    error
  )
);

export default createDataErrorSelector;
