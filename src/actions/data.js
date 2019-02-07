/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/**
 * Value for the DATA_LOADING action type.
 * @constant
 * @type {string}
 */
export const DATA_LOADING = '@@promotively/DATA_LOADING';

/**
 * Value for the DATA_ERROR action type.
 * @constant
 * @type {string}
 */
export const DATA_ERROR = '@@promotively/DATA_ERROR';

/**
 * Value for the DATA_COMPLETE action type.
 * @constant
 * @type {string}
 */
export const DATA_COMPLETE = '@@promotively/DATA_COMPLETE';

/**
 * Value for the DATA_REMOVE action type.
 * @constant
 * @type {string}
 */
export const DATA_REMOVE = '@@promotively/DATA_REMOVE';

/**
 * Creates an action that sets the error state on data.
 * @function
 * @param {string} id Unique identifier for the data.
 * @param {string} error The error to set on the data.
 *
 * @returns {object} Action for DATA_ERROR type.
 */
export const errorWithData = (id, error) => ({
  error,
  id,
  type: DATA_ERROR
});

/**
 * Creates an asynchronous action that fetches the data and saves it in the store.
 * @function
 * @async
 * @param {string} id Identifier for the data. If the same identifier is used across multiple components they will all share the same data.
 * @param {function} promise Asychronous function that returns a promise to be resolved.
 *
 * @returns {function} Asynchronous function that returns a promise that resolves the action.
 */
export const fetchData = (id, promise) => (dispatch) => {
  dispatch({
    id,
    type: DATA_LOADING
  });

  return promise().then((data) => (
    dispatch({
      data,
      id,
      type: DATA_COMPLETE
    })
  )).catch((error) => {
    dispatch(errorWithData(id, error.message));

    throw error;
  });
};

/**
 * Creates an action that clears data from the store.
 * @function
 * @param {string} id Unique identifier for the data.
 *
 * @returns {object} Action for DATA_REMOVE type.
 */
export const clearData = (id) => ({
  id,
  type: DATA_REMOVE
});
