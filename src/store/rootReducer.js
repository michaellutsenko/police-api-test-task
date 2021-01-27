import categories from './reducers/categories';
import reports from './reducers/reports';

import { combineReducers } from 'redux';

export default combineReducers({
  categories,
  reports,
});
