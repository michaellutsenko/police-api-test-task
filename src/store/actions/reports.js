import * as API from '../../api/reports';

// Possible expansion: add params to the first brackets and pass them
// down to the API calls. Read more in src/api/reports.js
export const getReports = (category) => async (dispatch) => {
  dispatch({ type: 'reports/pending' });
  try {
    const data = await API.getReports(category);
    dispatch({ type: 'reports/fulfilled', payload: data });
  } catch (err) {
    dispatch({ type: 'reports/rejected' });
  }
};
