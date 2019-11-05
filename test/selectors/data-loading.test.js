/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

import createDataLoadingSelector from 'selectors/data-loading';

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
