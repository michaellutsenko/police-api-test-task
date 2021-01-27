// This is a neat trick I picked up a few months ago, while refactoring a CRM
// Essentially, you write a custom hook and put all the data fetching and
// data selection from the store into it. It's like a selector 2.0
//
// This way, you don't have to write a lot of bulky code for data fetching
// and tracking its state within your component code. No useEffect or something like that
//
// Another benefit of this approach is that you can add arguments to hooks
// and with certain checks you can trigger API calls on component re-renders
// and within the component code it'll all take just one short line

import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../store/actions/reports';
import { getCategories } from '../store/actions/categories';

export const useCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  if (!categories && !loading) {
    dispatch(getCategories());
  }

  return { categories, loading };
};

export const useReports = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { reports, loading } = useSelector((state) => state.reports);

  // Checking if categories are loaded to avoid unexpected behaviour
  // We want the categories to be loaded BEFORE the reports because
  // reports have category IDs in them instead of display names
  if (!loading && !reports && categories) {
    dispatch(getReports());
  }

  return { reports, loading };
};
