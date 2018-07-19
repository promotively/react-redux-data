
import { clearData, fetchData } from './actions';
import { createDataSelector } from './selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { connect as withRedux } from 'react-redux';

const withData = (key, promise, map) => (Component) => {
  const mapStateToProps = (state, props) => {
    const dataSelector = createDataSelector(key);

    return {
      fetchedData: dataSelector(state, props)
    };
  };

  const mapDispatchToProps = {
    clearData,
    fetchData
  };

  @withRedux(mapStateToProps, mapDispatchToProps)
  class WrappedComponent extends React.Component {

    static propTypes = {
      clearData: PropTypes.func.isRequired,
      fetchData: PropTypes.func.isRequired,
      fetchedData: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]).isRequired
    }

    componentWillDispatch = () => {
      const { fetchData } = this.props;
      const props = this.getComponentProps();

      return fetchData(key, () => promise(props), map);
    }

    getComponentProps = () => (
      Object.keys(this.props).filter((name) => (
        ![ 'clearData', 'fetchData', 'fetchedData' ].includes(name)
      )).reduce((result, name) => {
        result[name] = this.props[name];

        return result;
      }, {})
    )

    componentDidMount() {
      const { fetchedData } = this.props;

      if (!fetchedData || (fetchedData && Object.keys(fetchedData).length === 0)) {
        this.componentWillDispatch();
      }
    }

    componentWillUnmount() {
      const { clearData } = this.props;

      clearData(key);
    }

    render() {
      const props = this.getComponentProps();

      return (
        <Component {...props} />
      );
    }

  }

  return WrappedComponent;
};

export default withData;
