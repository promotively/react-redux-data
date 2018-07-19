import * as exports from '../lib/index';
import { DATA_FETCH_CLEAR, DATA_FETCH_COMPLETE, DATA_FETCH_ERROR, DATA_FETCH_LOADING, clearData, fetchData } from '../lib/actions';
import dataReducer from '../lib/reducer';
import hydrateStore from '../lib/hydrate';
import withData from '../lib/container';

describe('lib/index.js', () => {
  it('should export fetchData action creator.', () => {
    expect(exports.fetchData).toEqual(fetchData);
  });

  it('should export clearData action creator.', () => {
    expect(exports.clearData).toEqual(clearData);
  });

  it('should export DATA_FETCH_LOADING action type.', () => {
    expect(exports.DATA_FETCH_LOADING).toEqual(DATA_FETCH_LOADING);
  });

  it('should export DATA_FETCH_ERROR action type.', () => {
    expect(exports.DATA_FETCH_ERROR).toEqual(DATA_FETCH_ERROR);
  });

  it('should export DATA_FETCH_COMPLETE action type.', () => {
    expect(exports.DATA_FETCH_COMPLETE).toEqual(DATA_FETCH_COMPLETE);
  });

  it('should export DATA_FETCH_CLEAR action type.', () => {
    expect(exports.DATA_FETCH_CLEAR).toEqual(DATA_FETCH_CLEAR);
  });

  it('should export withData higher order component.', () => {
    expect(exports.withData).toEqual(withData);
  });

  it('should export hydrateStore function', () => {
    expect(exports.hydrateStore).toEqual(hydrateStore);
  });

  it('should export the data reducer', () => {
    expect(exports.dataReducer).toEqual(dataReducer);
  });
});
