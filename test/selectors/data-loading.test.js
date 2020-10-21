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

import { createDataLoadingSelector } from 'selectors/data-loading';

const dataId = 'test';

describe('selectors/data-loading.js', () => {
  it('should find and return the loading state.', () => {
    const dataLoadingSelector = createDataLoadingSelector(dataId);
    const mockState = {
      data: {
        [dataId]: {
          loading: true
        }
      }
    };

    expect(dataLoadingSelector(mockState)).toEqual(true);
  });
});
