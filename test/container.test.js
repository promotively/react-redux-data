import { configure, shallow } from 'enzyme';
import { DATA_FETCH_CLEAR, DATA_FETCH_LOADING } from '../lib/actions';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import withData from '../lib/container';

configure({ adapter: new Adapter() });
const createMockStore = configureMockStore([ thunk ]);

describe('lib/container.js', () => {
  it('should call componentWillDispatch method when there is no data.', () => {
    const Component = () => 'test';
    const createMockPromise = () => Promise.resolve({ test: true });
    const Container = withData('test', createMockPromise)(Component);
    const store = createMockStore({
      data: {
        test: {
          data: {},
          error: null,
          loading: false
        }
      }
    });

    shallow(<Container test />, {
      context: {
        store
      }
    }).dive();

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      key: 'test',
      type: DATA_FETCH_LOADING
    });
  });

  it('should not call componentWillDispatch method when there is data.', () => {
    const Component = () => 'test';
    const createMockPromise = () => Promise.resolve({ test: true });
    const Container = withData('test', createMockPromise)(Component);
    const store = createMockStore({
      data: {
        test: {
          data: [{
            test: true
          }],
          error: null,
          loading: false
        }
      }
    });

    shallow(<Container />, {
      context: {
        store
      }
    }).dive();

    const actions = store.getActions();

    expect(actions).toHaveLength(0);
  });

  it('should clear fetched data when the container component unmounts.', () => {
    const Component = () => 'test';
    const createMockPromise = () => Promise.resolve({ test: true });
    const Container = withData('test', createMockPromise)(Component);
    const store = createMockStore({
      data: {
        test: {
          data: {},
          error: null,
          loading: false
        }
      }
    });

    const wrapper = shallow(<Container />, {
      context: {
        store
      }
    }).dive();

    wrapper.unmount();

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      key: 'test',
      type: DATA_FETCH_CLEAR
    });
  });
});
