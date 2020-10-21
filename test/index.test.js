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

import * as exports from 'index';
import {
  DATA_COMPLETE,
  DATA_ERROR,
  DATA_LOADING,
  DATA_DESTROY,
  errorData,
  completeData,
  fetchData,
  loadingData,
  destroyData
} from 'actions/data';
import { createDataErrorSelector } from 'selectors/data-error';
import { createDataLoadingSelector } from 'selectors/data-loading';
import { createDataSelector } from 'selectors/data';
import { Data } from 'containers/data';
import { dataReducer } from 'reducers/data';
import { hydrateStore } from 'helpers/hydrate-store';
import { useData } from 'helpers/use-data';
import { withData } from 'helpers/with-data';

describe('index.js', () => {
  it('should export fetchData action creator.', () => {
    expect(exports.fetchData).toEqual(fetchData);
    expect(exports.fetchData).not.toBeFalsy();
  });

  it('should export loadingData action creator.', () => {
    expect(exports.loadingData).toEqual(loadingData);
    expect(exports.loadingData).not.toBeFalsy();
  });

  it('should export errorData action creator.', () => {
    expect(exports.errorData).toEqual(errorData);
    expect(exports.errorData).not.toBeFalsy();
  });

  it('should export completeData action creator.', () => {
    expect(exports.completeData).toEqual(completeData);
    expect(exports.completeData).not.toBeFalsy();
  });

  it('should export destroyData action creator.', () => {
    expect(exports.destroyData).toEqual(destroyData);
    expect(exports.destroyData).not.toBeFalsy();
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

  it('should export DATA_DESTROY action type.', () => {
    expect(exports.DATA_DESTROY).toEqual(DATA_DESTROY);
    expect(exports.DATA_DESTROY).not.toBeFalsy();
  });

  it('should export Data react.js container component.', () => {
    expect(exports.Data).toEqual(Data);
    expect(exports.Data).not.toBeFalsy();
  });

  it('should export useData react.js hook.', () => {
    expect(exports.useData).toEqual(useData);
    expect(exports.useData).not.toBeFalsy();
  });

  it('should export withData higher order react.js component.', () => {
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
