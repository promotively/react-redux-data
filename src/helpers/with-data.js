/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import {
  clearData,
  fetchData
} from 'actions/data';
import createDataErrorSelector from 'selectors/data-error';
import createDataLoadingSelector from 'selectors/data-loading';
import createDataSelector from 'selectors/data';
import React from 'react';
import { connect as withRedux } from 'react-redux';

/**
 * @typedef WrappedDataComponentProps
 * @type {object}
 * @property {object} data The current data in the store.
 * @property {string} error The current data error state.
 * @property {function} clearData Redux action to remove the data from the store.
 * @property {function} errorWithData Redux action to set an error for the data in the store.
 * @property {function} fetchData Redux action to re-fetch the data and save it in the store.
 * @property {string} loading The current data loading state.
*/

/**
 * The action creators to wrap with react-redux.
 * @constant
 * @type {object}
 */
const mapDispatchToProps = {
  clearData,
  fetchData
};

/**
 * Creates a new component wrapped by the withData higher order component.
 * @function
 * @param {string} id A unique identifier for this data.
 * @param {promise} promise The source of the data.
 *
 * @returns {function} The connected and wrapped withData higher order component.
 */
const withData = (id, promise) => (Component) => {

  /**
   * Maps the state from the store back to props that are passed down to the container component.
   * @function
   * @param {object} state The current state of the store.
   * @param {object} props The properties available to the the parent component.
   *
   * @returns {object} Mapped properties from the store.
   */
  const mapStateToProps = (state, props) => {
    const dataSelector = createDataSelector(id);
    const dataErrorSelector = createDataErrorSelector(id);
    const dataLoadingSelector = createDataLoadingSelector(id);

    return {
      data: dataSelector(state, props),
      error: dataErrorSelector(state, props),
      loading: dataLoadingSelector(state, props)
    };
  };

  class WrappedComponent extends React.PureComponent {

    /**
     * Returns the promise to be resolved.
     * @function
     * @returns {promise} The promise to be resolved.
     * @memberof WrappedComponent
     */
    componentWillDispatch() {
      const { fetchData } = this.props;

      return fetchData(id, () => promise(this.props));
    }

    /**
     * Fetches the data by resolving the promise if it is not already in the store or is already processing.
     * Server side data fetching does not work with componentDidMount (see instead: src/utils/hydrate.js).
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentDidMount() {
      const { data } = this.props;

      if (!data || (data && Object.keys(data).length === 0)) {
        this.componentWillDispatch();
      }
    }

    /**
     * Removes the data from the store when the component unmounts.
     * @function
     * @memberof WrappedComponent
     * @returns {undefined} Function does not return a value.
     */
    componentWillUnmount() {
      const { clearData } = this.props;

      clearData(id);
    }

    /**
     * Renders the child component whenever the props have changed.
     * @function
     * @memberof WrappedComponent
     * @returns {object} React JSX to render the child component.
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }

  }

  WrappedComponent.displayName = `WithData(${Component.displayName})`;

  return withRedux(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withData;
