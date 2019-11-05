/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/*
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 */

/**
 * Value for the DATA_LOADING redux.js action type.
 * @constant

 * @type {String}
 */
export const DATA_LOADING = '@@promotively/DATA_LOADING';

/**
 * Value for the DATA_ERROR redux.js action type.
 * @constant
 * @type {String}
 */
export const DATA_ERROR = '@@promotively/DATA_ERROR';

/**
 * Value for the DATA_COMPLETE redux.js action type.
 * @constant
 * @type {String}
 */
export const DATA_COMPLETE = '@@promotively/DATA_COMPLETE';

/**
 * Value for the DATA_REMOVE redux.js action type.
 * @constant
 * @type {String}
 */
export const DATA_REMOVE = '@@promotively/DATA_REMOVE';

/**
 * Creates a redux.js action that sets the error state on data.
 * @function
 * @param {String} id The ID for the data.
 * @param {Error} error The error to set on the data.
 * @returns {Object} The redux.js action for the DATA_ERROR redux.js action type.
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
 * Creates a redux.js action that sets the loading state on data.
 * @function
 * @param {String} id The ID for the data.
 * @returns {Object} The redux.js action for the DATA_LOADING redux.js action type.
 * @example
 * ...
 *
 * import { loadingData } from '@promotively/react-redux-data';
 *
 * const handleLoadingSpinner = (props) => (
 *   props.dispatch(loadingData('dashboard'))
 * );
 *
 * ...
 */
export const loadingData = (id) => ({
  id,
  type: DATA_LOADING
});

/**
 * Creates a redux.js action that sets the complete state on data.
 * @function
 * @param {String} id The ID for the data.
 * @param {Object|Array} data An array or object containing the data.
 * @returns {Object} The redux.js action for the DATA_REMOVE redux.js action type.
 * @example
 * ...
 *
 * import { completeData } from '@promotively/react-redux-data';
 *
 * const handleCache = (id, data) => (
 *   props.dispatch(completeData('dashboard', {
 *     data: JSON.parse(localStorage.getItem("dashboard-cache"))
 *   }))
 * );
 *
 * ...
 */
export const completeData = (id, data) => ({
  data,
  id,
  type: DATA_COMPLETE
});

/**
 * Creates a redux.js thunk that fetches data.
 * @function
 * @param {String} id The ID for the data.
 * @param {Function} promise Function that creates the promise to be resolved.
 * @returns {Function} A function that returns a promise that dispatches redux.js actions for DATA_LOADING to DATA_ERROR and DATA_LOADING to DATA_COMPLETE during data fetching.
 * @example
 * ...
 *
 * import { fetchData } from '@promotively/react-redux-data';
 *
 * const fetchDashboardData = (props) => (
 *   fetchData('dashboard', axios.get('http://localhost:3000/api/v1/dashboard'))(props.dispatch);
 * );
 *
 * ...
 */
export const fetchData = (id, promise) => (dispatch) => {
  dispatch(loadingData(id));

  return promise().then((data) => (
    dispatch(completeData(id, data))
  )).catch((error) => {
    dispatch(errorData(id, error));

    throw error;
  });
};

/**
 * Creates a redux.js action that removes previously fetched data from the store.
 * @function
 * @param {String} id The ID for the data.
 * @returns {Object} The redux.js action for the DATA_REMOVE redux.js action type.
 * @example
 * ...
 *
 * import { removeData } from '@promotively/react-redux-data';
 *
 * const resetDashboardData = (props) => (
 *   props.dispatch(removeData('dashboard'))
 * );
 *
 * ...
 */
export const removeData = (id) => ({
  id,
  type: DATA_REMOVE
});
