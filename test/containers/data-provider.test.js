/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import configureMockStore from 'redux-mock-store';
import DataContext from 'helpers/data-context';
import DataProvider from 'containers/data-provider';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import thunk from 'redux-thunk';

const mockData = [{ id: 'test' }];
const createMockStore = configureMockStore([ thunk ]);

describe('containers/data-provider.js', () => {
  it('should pass the data context down to any withData higher order components or data context consumers.', () => {
    const mockStore = createMockStore({
      data: {}
    });

    ReactTestRenderer.create(
      <Provider store={mockStore}>
        <DataProvider context={mockData}>
          <DataContext.Consumer>
            {(context) => (expect(context).toEqual(mockData))}
          </DataContext.Consumer>
        </DataProvider>
      </Provider>
    );
  });

});
