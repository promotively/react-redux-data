/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import { createSelector } from 'reselect';

/**
 * Returns a selector function that returns the current loading state for the data.
 * @function
 * @param {string} id The identifier for the data. If the same identifier is used across multiple components they will all share the same data.
 * @returns {function} reselect.js based selector
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