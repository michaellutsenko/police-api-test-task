import * as API from '../../api/reports';

// Possible expansion: add params to the first brackets and pass them
// down to the API calls. Read more in src/api/reports.js
export const getReports = () => async (dispatch, getState) => {
  dispatch({ type: 'reports/pending' });
  try {
    const data = await API.getReports();
    dispatch({ type: 'reports/fulfilled', payload: data });
  } catch (err) {
    dispatch({ type: 'reports/rejected' });
  }
};
