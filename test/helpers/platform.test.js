/**
 * promotively/react-redux-data
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */

import { isNode } from 'helpers/platform';

describe('helpers/platform.js', () => {
  it('should return true if the platform is node.', () => {
    expect(isNode()).toEqual(true);
  });
});
