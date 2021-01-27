import * as API from '../../api/categories';

// Possible expansion: add params to the first brackets and pass them
// down to the API calls. Read more in src/api/categories.js
export const getCategories = () => async (dispatch, getState) => {
  dispatch({ type: 'categories/pending' });
  try {
    const data = await API.getCategories();
    dispatch({ type: 'categories/fulfilled', payload: data });
  } catch (err) {
    dispatch({ type: 'categories/rejected' });
  }
};
