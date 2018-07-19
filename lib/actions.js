export const DATA_FETCH_LOADING = '@@promotively/DATA_FETCH_LOADING';
export const DATA_FETCH_ERROR = '@@promotively/DATA_FETCH_ERROR';
export const DATA_FETCH_COMPLETE = '@@promotively/DATA_FETCH_COMPLETE';
export const DATA_FETCH_CLEAR = '@@promotively/DATA_FETCH_CLEAR';

export const fetchData = (key, request, map) => async (dispatch) => {
  dispatch({
    key,
    type: DATA_FETCH_LOADING
  });

  try {
    const response = await request();
    const data = typeof response.json === 'function' ? await response.json() : response;

    return dispatch({
      data: typeof map === 'function' ? map(data) : data,
      key,
      type: DATA_FETCH_COMPLETE
    });
  } catch (error) {
    return dispatch({
      error: error.message,
      key,
      type: DATA_FETCH_ERROR
    });
  }
};

export const clearData = (key) => ({
  key,
  type: DATA_FETCH_CLEAR
});
