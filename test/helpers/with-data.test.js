/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import { configure, shallow } from 'enzyme';
import {
  DATA_LOADING,
  DATA_REMOVE
} from 'actions/data';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import withData from 'helpers/with-data';

configure({ adapter: new Adapter() });

const dataId = 'test-data';
const mockData = { test: true };
const MockComponent = (props) => props.children || 'test';
const createMockStore = configureMockStore([ thunk ]);
const createMockPromise = () => Promise.resolve(mockData);

describe('helpers/with-data.js', () => {
  it('should call componentWillDispatch method when there is no data.', () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {}
    });

    const container = shallow(<DataContainer />, {
      context: {
        store: mockStore
      }
    });

    container.dive();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: dataId,
      type: DATA_LOADING
    });
  });

  it('should not call componentWillDispatch method when there is already data (ie: server side rendering).', () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {
        [dataId]: {
          data: [ mockData ],
          error: null,
          loading: false
        }
      }
    });

    const container = shallow(<DataContainer />, {
      context: {
        store: mockStore
      }
    });

    container.dive();

    const actions = mockStore.getActions();

    expect(actions).toHaveLength(0);
  });

  it('should pass props through to child component.', () => {
    const mockState = {
      data: {
        [dataId]: {
          data: [ mockData ],
          error: null,
          loading: false
        }
      }
    };
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore(mockState);
    const container = shallow(<DataContainer className={dataId} />, {
      context: {
        store: mockStore
      }
    });

    container.dive().find(MockComponent).exists(`.${dataId}`);
  });

  it('should remove fetched data when the container component unmounts.', () => {
    const DataContainer = withData(dataId, createMockPromise)(MockComponent);
    const mockStore = createMockStore({
      data: {
        [dataId]: {
          data: [ mockData ],
          error: null,
          loading: false
        }
      }
    });

    const container = shallow(<DataContainer />, {
      context: {
        store: mockStore
      }
    });

    container.dive().unmount();

    const actions = mockStore.getActions();

    expect(actions[0]).toEqual({
      id: dataId,
      type: DATA_REMOVE
    });
  });
});
