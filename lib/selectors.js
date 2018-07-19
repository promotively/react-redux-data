import { createSelector } from 'reselect';

export const createDataSelector = (key) => createSelector(
  (state) => (
    (state.data[key] && state.data[key].data) || undefined
  ),
  (hasData) => (
    hasData
  )
);

export const createDataLoadingSelector = (key) => createSelector(
  (state) => (
    Boolean(state.data[key] && state.data[key].loading)
  ),
  (isLoading) => (
    isLoading
  )
);

export const createDataErrorSelector = (key) => createSelector(
  (state) => (
    (state.data[key] && state.data[key].error) || ''
  ),
  (hasError) => (
    hasError
  )
);
