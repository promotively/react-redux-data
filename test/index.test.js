/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import * as exports from 'index';
import {
  DATA_COMPLETE,
  DATA_ERROR,
  DATA_LOADING,
  DATA_REMOVE,
  clearData,
  errorWithData,
  fetchData
} from 'actions/data';
import createDataErrorSelector from 'selectors/data-error';
import createDataLoadingSelector from 'selectors/data-loading';
import createDataSelector from 'selectors/data';
import dataReducer from 'reducers/data';
import hydrateStore from 'utils/hydrate';
import withData from 'helpers/with-data';

describe('index.js', () => {
  it('should export fetchData action creator.', () => {
    expect(exports.fetchData).toEqual(fetchData);
    expect(exports.fetchData).not.toBeFalsy();
  });

  it('should export errorWithData action creator.', () => {
    expect(exports.errorWithData).toEqual(errorWithData);
    expect(exports.errorWithData).not.toBeFalsy();
  });

  it('should export clearData action creator.', () => {
    expect(exports.clearData).toEqual(clearData);
    expect(exports.clearData).not.toBeFalsy();
  });

  it('should export DATA_LOADING action type.', () => {
    expect(exports.DATA_LOADING).toEqual(DATA_LOADING);
    expect(exports.DATA_LOADING).not.toBeFalsy();
  });

  it('should export DATA_ERROR action type.', () => {
    expect(exports.DATA_ERROR).toEqual(DATA_ERROR);
    expect(exports.DATA_ERROR).not.toBeFalsy();
  });

  it('should export DATA_COMPLETE action type.', () => {
    expect(exports.DATA_COMPLETE).toEqual(DATA_COMPLETE);
    expect(exports.DATA_COMPLETE).not.toBeFalsy();
  });

  it('should export DATA_REMOVE action type.', () => {
    expect(exports.DATA_REMOVE).toEqual(DATA_REMOVE);
    expect(exports.DATA_REMOVE).not.toBeFalsy();
  });

  it('should export withData higher order component.', () => {
    expect(exports.withData).toEqual(withData);
    expect(exports.withData).not.toBeFalsy();
  });

  it('should export hydrateStore function', () => {
    expect(exports.hydrateStore).toEqual(hydrateStore);
    expect(exports.hydrateStore).not.toBeFalsy();
  });

  it('should export the data reducer', () => {
    expect(exports.dataReducer).toEqual(dataReducer);
    expect(exports.dataReducer).not.toBeFalsy();
  });

  it('should export the createDataErrorSelector function', () => {
    expect(exports.createDataErrorSelector).toEqual(createDataErrorSelector);
    expect(exports.createDataErrorSelector).not.toBeFalsy();
  });

  it('should export the createDataLoadingSelector function', () => {
    expect(exports.createDataLoadingSelector).toEqual(createDataLoadingSelector);
    expect(exports.createDataLoadingSelector).not.toBeFalsy();
  });

  it('should export the createDataSelector function', () => {
    expect(exports.createDataSelector).toEqual(createDataSelector);
    expect(exports.createDataSelector).not.toBeFalsy();
  });
});
