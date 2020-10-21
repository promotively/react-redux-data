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
 * @module actions
 *
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 */

/* eslint-disable promise/prefer-await-to-then */

/**
 * Value for the DATA_LOADING redux.js action type.
 *
 * @constant
 *
 * @type {string}
 */
export const DATA_LOADING = '@@promotively/DATA_LOADING';

/**
 * Value for the DATA_ERROR redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const DATA_ERROR = '@@promotively/DATA_ERROR';

/**
 * Value for the DATA_COMPLETE redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const DATA_COMPLETE = '@@promotively/DATA_COMPLETE';

/**
 * Value for the DATA_DESTROY redux.js action type.
 *
 * @constant
 * @type {string}
 */
export const DATA_DESTROY = '@@promotively/DATA_DESTROY';

/**
 * @typedef DataErrorAction
 * @type {object}
 * @property {Error} error A javascript error that has not yet been thrown.
 * @property {string} id An id for identifying the data type.
 * @property {DATA_ERROR} type The redux.js action type to handle data errors.
 */

/**
 * Creates a redux.js action that sets the error state on data.
 *
 * @function
 * @param {string} id The ID for the data.
 * @param {Error} error The error to set on the data.
 * @returns {DataErrorAction} The redux.js action for the DATA_ERROR redux.js action type.
 * @example
 * ...
 *
 * import { errorData } from '@promotively/react-redux-data';
 *
 * const handleContentExpiredError = (props) => (
 *   props.dispatch(errorData('dashboard', new Error('Content is out of date, refresh to see new content.')))
 * );
 *
 * ...
 */
export const errorData = (id, error) => ({
  error: error.message,
  id,
  type: DATA_ERROR
});

/**
 * @typedef DataLoadingAction
 * @type {object}
 * @property {string} id An id for identifying the data type.
 * @property {DATA_LOADING} type The redux.js action type to initialize data fetching.
 */

/**
 * Creates a redux.js action that sets the loading state on data.
 *
 * @function
 * @param query
 * @param {string} id The ID for the data.
 * @returns {DataLoadingAction} The redux.js action for the DATA_LOADING redux.js action type.
 * @example
 * ...
 *
 * import { loadingData } from '@promotively/react-redux-data';
 *
 * const handleLoadingSpinner = (props) => (
 * props.dispatch(loadingData('dashboard'))
 * );
 *
 * ...
 */
export const loadingData = (id, query) => ({
  id,
  query,
  type: DATA_LOADING
});

/**
 * @typedef DataCompleteAction
 * @type {object}
 * @property {object | Array} data A javascript array or object containing the fetched data.
 * @property {string} id An id for identifying the data type.
 * @property {DATA_COMPLETE} type The redux.js action type to finalize data fetching.
 */

/**
 * Creates a redux.js action that sets the complete state on data.
 *
 * @function
 * @param {string} id The ID for the data.
 * @param {object} query The query object used to fetch the data.
 * @param {string|number|boolean|object|Array} data The data which has been fetched.
 * @returns {DataCompleteAction} The redux.js action for the DATA_COMPLETE redux.js action type.
 * @example
 * ...
 *
 * import { completeData } from '@promotively/react-redux-data';
 *
 * const handleCache = (props) => (
 *   props.dispatch(completeData('dashboard', {
 *     data: JSON.parse(localStorage.getItem("dashboard-cache"))
 *   }))
 * );
 *
 * ...
 */
export const completeData = (id, query, data) => ({
  data,
  id,
  query,
  type: DATA_COMPLETE
});

/**
 * Creates a redux.js thunk that fetches data.
 *
 * @function
 * @param {string} id The ID for the data.
 * @param source
 * @param query
 * @param {Function} promise Function that creates the promise to be resolved.
 * @returns {Function} A function that returns a promise that dispatches
 * redux.js actions for DATA_LOADING to DATA_ERROR and DATA_LOADING to
 * DATA_COMPLETE during data fetching.
 * @example
 * ...
 *
 * import { fetchData } from '@promotively/react-redux-data';
 *
 * const fetchDashboardData = (props) => (
 * fetchData('dashboard', axios.get('http://localhost:3000/api/v1/dashboard')
 * )(props.dispatch));
 *
 * ...
 */
export const fetchData = (id, source, query = {}) => dispatch => {
  dispatch(loadingData(id, query));

  return source(query)
    .then(data => dispatch(completeData(id, query, data)))
    .catch(error => {
      dispatch(errorData(id, error));

      throw error;
    });
};

/**
 * @typedef DataRemoveAction
 * @type {object}
 * @property {string} id An id for identifying the data type.
 * @property {DATA_DESTROY} type The redux.js action type to handle removing fetched data.
 */

/**
 * Creates a redux.js action that removes previously fetched data from the store.
 *
 * @function
 * @param {string} id The ID for the data.
 * @returns {DataRemoveAction} The redux.js action for the DATA_DESTROY redux.js action type.
 * @example
 * ...
 *
 * import { destroyData } from '@promotively/react-redux-data';
 *
 * const resetDashboardData = (props) => (
 *   props.dispatch(destroyData('dashboard'))
 * );
 *
 * ...
 */
export const destroyData = id => ({
  id,
  type: DATA_DESTROY
});
