import { get } from './index';

const serverUri = process.env.REACT_APP_POLICE_API_URI;

export const getCategories = async (date = '2020-01') => {
  const uri = `${serverUri}/crime-categories?date=${date}`;

  return get(uri);
};
