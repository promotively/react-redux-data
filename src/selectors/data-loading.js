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
 * Returns a reselect.js selector function to get the current data loading state.
 * @function
 * @param {String} id The ID for the data.
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
const createDataLoadingSelector = (id) => createSelector(
  (state) => (
    Boolean(state.data[id] && state.data[id].loading)
  ),
  (loading) => (
    loading
  )
);

export default createDataLoadingSelector;
