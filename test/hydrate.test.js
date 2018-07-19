import hydrateStore from '../lib/hydrate';
import React from 'react';

describe('lib/hydrate.js', () => {
  it('should call componentWillDispatch on any child components.', async () => {
    const mockComponentWillDispatch = jest.fn().mockImplementation(() =>
      Promise.resolve()
    );

    class Test extends React.Component {

      componentWillDispatch = mockComponentWillDispatch
      render() {
        return ('test');
      }

    }

    await hydrateStore(<Test />);

    expect(mockComponentWillDispatch).toHaveBeenCalled();
  });

  it('should throw an error when there is an error thrown while parsing the JSX.', async () => {
    const mockComponentWillDispatch = jest.fn().mockImplementation(() =>
      Promise.reject(new Error('error'))
    );

    class Test extends React.Component {

      componentWillDispatch = mockComponentWillDispatch
      render() {
        return ('test');
      }

    }

    try {
      expect(await hydrateStore(<Test />)).toThrow();
    } catch (error) {
      expect(error).toEqual(new Error('error'));
    }
  });
});
