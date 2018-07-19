import { createDataSelector, createDataErrorSelector, createDataLoadingSelector } from '../lib/selectors';

describe('lib/selectors.js', () => {
  it('should return undefined when the data state is not available.', () => {
    const dataSelector = createDataSelector('test');
    const mockState = {
      data: {}
    };

    expect(dataSelector(mockState)).toEqual(undefined);
  });

  it('should find and return the data state.', () => {
    const dataSelector = createDataSelector('test');
    const mockState = {
      data: {
        test: {
          data: {
            test: true
          }
        }
      }
    };

    expect(dataSelector(mockState)).toEqual({ test: true });
  });

  it('should find and return the loading state.', () => {
    const dataLoadingSelector = createDataLoadingSelector('test');
    const mockState = {
      data: {
        test: {
          loading: true
        }
      }
    };

    expect(dataLoadingSelector(mockState)).toEqual(true);
  });

  it('should return an empty string when the error state is not avilable.', () => {
    const dataErrorSelector = createDataErrorSelector('test');
    const mockState = {
      data: {}
    };

    expect(dataErrorSelector(mockState)).toEqual('');
  });

  it('should find and return the error state.', () => {
    const dataErrorSelector = createDataErrorSelector('test');
    const mockState = {
      data: {
        test: {
          error: 'error'
        }
      }
    };

    expect(dataErrorSelector(mockState)).toEqual('error');
  });
});
