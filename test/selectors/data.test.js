/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import createDataSelector from 'selectors/data';

const dataId = 'test';
const mockData = { test: true };

describe('selectors/data.js', () => {
  it('should return undefined when the data state is not available.', () => {
    const dataSelector = createDataSelector(dataId);
    const mockState = {
      data: {}
    };

    expect(dataSelector(mockState)).toEqual(undefined);
  });

  it('should find and return the data state.', () => {
    const dataSelector = createDataSelector(dataId);
    const mockState = {
      data: {
        [dataId]: {
          data: mockData
        }
      }
    };

    expect(dataSelector(mockState)).toEqual(mockData);
  });
});
