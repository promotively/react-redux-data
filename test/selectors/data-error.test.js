/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

import createDataErrorSelector from 'selectors/data-error';

const dataId = 'test';
const mockError = new Error('test-error');

describe('selectors/data-error.js', () => {
  it('should return an empty string when the error state is not avilable.', () => {
    const dataErrorSelector = createDataErrorSelector(dataId);
    const mockState = {
      data: {}
    };

    expect(dataErrorSelector(mockState)).toEqual('');
  });

  it('should find and return the error state.', () => {
    const dataErrorSelector = createDataErrorSelector(dataId);
    const mockState = {
      data: {
        [dataId]: {
          error: mockError.message
        }
      }
    };

    expect(dataErrorSelector(mockState)).toEqual(mockError.message);
  });
});
