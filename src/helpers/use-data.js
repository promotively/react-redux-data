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

/**
 * @module helpers
 *
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/react-redux}
 * @see {@link https://github.com/reduxjs/reselect}
 */

/* eslint-disable prefer-const */

import { useDispatch, useSelector } from 'react-redux';
import { useContext, useRef } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { fetchData, destroyData } from 'actions/data';
import { createDataLoadingSelector } from 'selectors/data-loading';
import { createDataErrorSelector } from 'selectors/data-error';
import { createDataSelector } from 'selectors/data';
import { DataContext } from 'helpers/data-context';
import { isNode } from 'helpers/platform';

export const useData = (id, options = {}) => {
  let { destroy, query, refresh, source } = options;
  const context = useContext(DataContext);
  const dispatch = useDispatch();
  const data = useSelector(createDataSelector(id));
  const error = useSelector(createDataErrorSelector(id));
  const loading = useSelector(createDataLoadingSelector(id));
  const firstUpdate = useRef(true);

  if (typeof id === 'undefined') {
    throw Error('No data identifier.');
  }

  if (typeof source === 'undefined') {
    throw Error('No data source.');
  }

  if (typeof destroy === 'undefined') {
    destroy = true;
  }

  if (typeof query === 'undefined') {
    query = {};
  }

  if (isNode() && Array.isArray(context) && !context.some(data => data.id === id)) {
    context.push({ id, query, source });
  }

  useDeepCompareEffect(() => {
    if (!(firstUpdate.current && data)) {
      dispatch(fetchData(id, () => source(query)));
    }

    if (!isNode() && refresh) {
      setInterval(() => {
        dispatch(fetchData(id, () => source(query)));
      }, refresh);
    }

    if (firstUpdate.current) {
      firstUpdate.current = false;
    }

    return () => {
      if (destroy || destroy === undefined) {
        dispatch(destroyData(id));
      }
    };
  }, [query]);

  return { data, error, loading, query };
};
