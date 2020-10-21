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
 * @module helpers
 *
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/react-redux}
 * @see {@link https://github.com/reduxjs/reselect}
 */

/* eslint-disable react/prop-types */

import React from 'react';
import { connect as withRedux } from 'react-redux';
import isEqual from 'fast-deep-equal';
import { completeData, errorData, fetchData, loadingData, destroyData } from 'actions/data';
import { createDataErrorSelector } from 'selectors/data-error';
import { createDataLoadingSelector } from 'selectors/data-loading';
import { createDataSelector } from 'selectors/data';
import { DataContext } from 'helpers/data-context';

/**
 * @typedef DataProps
 * @type {object}
 * @property {object} children Any react.js child components to be rendered.
 * @property {string} id An id for storing the data.
 * @property {Function} source A function that returns a promise that fetches the data.
 */

/**
 * Maps the state from the redux.js store back to props that are passed down to the react.js component.
 *
 * @private
 * @function
 * @param {object} state The current state of the redux.js store.
 * @param {object} props The properties available to the parent react.js component.
 * @returns {object} Mapped properties from the redux.js store.
 */
const mapStateToProps = (state, props) => {
  const { id } = props;
  const dataSelector = createDataSelector(id);
  const dataErrorSelector = createDataErrorSelector(id);
  const dataLoadingSelector = createDataLoadingSelector(id);

  return {
    data: dataSelector(state, props),
    error: dataErrorSelector(state, props),
    loading: dataLoadingSelector(state, props)
  };
};

/**
 * The action creators to wrap with react-redux.
 *
 * @constant
 * @type {object}
 */
const mapDispatchToProps = {
  completeData,
  destroyData,
  errorData,
  fetchData,
  loadingData
};

/**
 * @typedef WrappedComponentProps
 * @type {object}
 * @property {object} data The current data state.
 * @property {string} error The current error state.
 * @property {string} id The ID for the data.
 *  * @property {string} refresh The ID for the data.
 *  * @property {string} retry The ID for the data.
 *  * @property {string} timeout The ID for the data.
 *  * @property {string} cache The ID for the data.
 *
 *  * @property {string} destroy Should the data be sdf.
 * @property {Function} source A function that returns a promise that fetches the data.
 * @property {errorData} errorData Redux action to set the error state.
 * @property {fetchData} fetchData Redux action to set the data state (refresh the data).
 * @property {loadingData} loadingData Redux action to set the loading state.
 * @property {destroyData} destroyData Redux action to remove the data from the store.
 * @property {string} loading The current loading state.
 */

/**
 * Creates a new component wrapped by the withData higher order component.
 *
 * @function
 * @param {Function} Component A react.js form component.
 * @returns {Function} A react.js component that that wraps your component
 * using the withData higher order component.
 * @example
 * ...
 *
 * import { withData } from '@promotively/react-redux-data';
 *
 * const Users = props => (
 * <ul>
 * {props.users.map((user) => (
 * <li key={user.id}>{user.name}</li>
 * ))}
 * </ul>
 * );
 *
 * export const Data = withData({
 * id: 'users',
 * action: props => axios.get('http://localhost:3000/api/v1/users').then(data => data)
 * })(Users);
 */
export const withData = () => {
  /**
   * @private
   * @class
   */
  class WrappedComponent extends React.Component {
    /**
     * The default props passed down to the component.
     *
     * @static
     * @memberof WrappedComponent
     * @type {object}
     */
    static defaultProps = {
      destroy: true
    };

    static contextType = DataContext;

    static displayName = 'WithData(WrappedComponent)';

    /**
     * Fetches the data by resolving the promise if it is not already in the store or is already loading.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentDidMount() {
      const { props } = this;
      const { data, fetchData, id, query, refresh, source } = props;

      // Only fetch data if it is not already available in the redux.js store.
      if (!data || (data && Object.keys(data).length === 0)) {
        setTimeout(() => fetchData(id, () => source(query)), 1);
      }

      if (refresh) {
        setInterval(() => fetchData(id, () => source(query)), refresh);
      }
    }

    /**
     * Updates the data context if there is a parent <DataProvider /> component (useful for server side rendering).
     *
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentDidUpdate() {
      const { props } = this;
      const { fetchData, id, query, source } = props;

      setTimeout(() => fetchData(id, () => source(query)), 1);
    }

    /**
     * Updates the data context if there is a parent <DataProvider /> component (useful for server side rendering).
     *
     * @function
     * @memberof WrappedComponent
     * @param nextProps
     * @returns {boolean} The component should not update unless the query prop has changed.
     */
    shouldComponentUpdate(nextProps) {
      const { query: currentQuery } = this.props;
      const { query: nextQuery } = nextProps;

      return !isEqual(currentQuery, nextQuery);
    }

    /**
     * Updates the data context if there is a parent <DataProvider /> component (useful for server side rendering).
     *
     * @class
     * @param {DataProps} props The properties available to the component.
     * @param {Array} context The external data array used by the data provider when it needs data from this component.
     */
    constructor(props, context) {
      super(props, context);

      const { id, source, query } = props;

      if (typeof id === 'undefined') {
        throw Error('No data identifier.');
      }

      if (typeof source === 'undefined') {
        throw Error('No data source.');
      }

      /*
       * Only push to the data context if it exists, is an array and is not already
       * added to the data context.
       */
      if (Array.isArray(context) && !context.some(data => data.id === id)) {
        context.push({ id, query, source });
      }
    }

    /**
     * Removes the data from the store when the component unmounts.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { id, destroy, destroyData } = this.props;

      if (destroy) {
        setTimeout(() => destroyData(id), 1);
      }
    }

    /**
     * Renders the child component whenever the props have changed.
     *
     * @function
     * @memberof WrappedComponent
     * @returns {object} React JSX to render the child component.
     */
    render() {
      return null;
    }
  }

  return withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};
