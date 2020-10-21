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

import { createDataErrorSelector } from 'selectors/data-error';

const dataId = 'test';
const mockError = new Error('test-error');

describe('selectors/data-error.js', () => {
  it('should return null when there are no errors.', () => {
    const dataErrorSelector = createDataErrorSelector(dataId);
    const mockState = {
      data: {}
    };

    expect(dataErrorSelector(mockState)).toBeNull();
  });

  it('should return an error string when there is an error.', () => {
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
