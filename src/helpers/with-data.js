/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/**
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/react-redux}
 */

/* eslint-disable react/prop-types */

import { completeData, errorData, fetchData, loadingData, removeData } from 'actions/data';
import createDataErrorSelector from 'selectors/data-error';
import createDataLoadingSelector from 'selectors/data-loading';
import createDataSelector from 'selectors/data';
import DataContext from 'helpers/data-context';
import React from 'react';
import { connect as withRedux } from 'react-redux';

/**
 * The action creators to wrap with react-redux.
 * @constant
 * @type {Object}
 */
const mapDispatchToProps = {
  completeData,
  errorData,
  fetchData,
  loadingData,
  removeData
};

/**
 * Creates a new component wrapped by the withData higher order component.
 * @function
 * @param {Object} options An object containing configuration options.
 * @returns {Function} A function that that wraps your components using the withData higher order component.
 * @example
 * ...
 *
 * import { withData } from '@promotively/react-redux-data';
 *
 * const Users = props => (
 *   <ul>
 *     {props.users.map((user) => (
 *       <li key={user.id}>{user.name}</li>
 *     ))}
 *   </ul>
 * );
 *
 * export default withData({
 *   id: 'users',
 *   action: props => axios.get('http://localhost:3000/api/v1/users').then(data => data)
 * })(Users);
 *
 */
const withData = options => Component => {
  /**
   * Maps the state from the redux.js store back to props that are passed down to the react.js component.
   * @function
   * @param {Object} state The current state of the redux.js store.
   * @param {Object} props The properties available to the parent react.js component.
   * @returns {Object} Mapped properties from the redux.js store.
   */
  const mapStateToProps = (state, props) => {
    const { id } = options;
    const dataSelector = createDataSelector(id);
    const dataErrorSelector = createDataErrorSelector(id);
    const dataLoadingSelector = createDataLoadingSelector(id);

    return {
      ...props,
      data: dataSelector(state, props),
      error: dataErrorSelector(state, props),
      loading: dataLoadingSelector(state, props)
    };
  };

  class WrappedComponent extends React.PureComponent {
    /**
     * @typedef WrappedComponentProps
     * @type {Object}
     * @property {Object} data The current data state.
     * @property {String} error The current error state.
     * @property {String} id The ID for the data.
     * @property {Function} action A function that returns a promise that fetches the data.
     * @property {errorData} errorData Redux action to set the error state.
     * @property {fetchData} fetchData Redux action to set the data state (refresh the data).
     * @property {loadingData} loadingData Redux action to set the loading state.
     * @property {removeData} removeData Redux action to remove the data from the store.
     * @property {String} loading The current loading state.
     */

    /**
     * The default configuration options for this component.
     * @constant
     * @type {Object}
     */
    defaults = {
      destroy: true
    };

    /**
     * The default configuration options merged with the specified options.
     * @constant
     * @type {Object}
     */
    options = {
      ...this.defaults,
      ...options
    };

    /**
     * Returns only the component properties that need to be passed to the child component.
     * @function
     * @memberof WrappedComponent
     * @returns {WrappedComponentProps} A new object that contains the props to pass down to the wrapped component.
     */
    getComponentProps() {
      return {
        ...this.props,
        ...options
      };
    }

    /**
     * Fetches the data by resolving the promise if it is not already in the store or is already loading.
     * @function
     * @memberof WrappedComponent
     * @returns {Undefined} Function does not return a value.
     */
    componentDidMount() {
      const { props } = this;
      const { data, fetchData } = props;

      // Only fetch data if it is not already available in the redux.js store.
      if (!data || (data && Object.keys(data).length === 0)) {
        fetchData(options.id, () => options.action(props));
      }
    }

    /**
     * Updates the data context if there is a parent <DataProvider /> component (useful for server side rendering).
     * @class
     * @param {Object} props The properties available to the component.
     * @param {Object} context The context available to the component.
     */
    constructor(props, context) {
      super(props, context);

      // Only push to the data context if it exists, is an array and is not already
      // added to the data context.
      if (Array.isArray(context) && !context.includes(options)) {
        context.push({
          ...options,
          props
        });
      }
    }

    /**
     * Removes the data from the store when the component unmounts.
     * @function
     * @memberof WrappedComponent
     * @returns {Undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { id, destroy } = this.options;
      const { removeData } = this.props;

      if (destroy) {
        removeData(id);
      }
    }

    /**
     * Renders the child component whenever the props have changed.
     * @function
     * @memberof WrappedComponent
     * @returns {Object} React JSX to render the child component.
     */
    render() {
      return <Component {...this.getComponentProps()} />;
    }
  }

  WrappedComponent.displayName = 'WithData(WrappedComponent)';
  WrappedComponent.contextType = DataContext;

  return withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withData;
