/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import hydrateStore from 'utils/hydrate';
import React from 'react';

const MockComponent = (props) => <div {...props} />;
const mockError = new Error('error');

describe('utils/hydrate.js', () => {
  it('should call componentWillDispatch on any child components.', async () => {
    const mockComponentWillDispatch = jest.fn(() => Promise.resolve());

    class Test extends React.Component {

      componentWillDispatch = mockComponentWillDispatch

      render() {
        return <MockComponent />;
      }

    }

    await hydrateStore(<Test />);

    expect(mockComponentWillDispatch).toHaveBeenCalled();
  });

  it('should throw an error when there is an error thrown while parsing the JSX.', async () => {
    const mockComponentWillDispatch = jest.fn(() =>
      Promise.reject(mockError)
    );

    class Test extends React.Component {

      componentWillDispatch = mockComponentWillDispatch

      render() {
        return <MockComponent />;
      }

    }

    try {
      expect(await hydrateStore(<Test />)).toThrow();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
