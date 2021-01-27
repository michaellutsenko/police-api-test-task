import React from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useCategories } from './hooks';
import { getReports } from '../store/actions/reports';

// For the select we could use state and make it controlled
// but we don't really have to. We only care for onChange triggers
// in the select component
const CategoriesDropdown = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useCategories();

  return !loading ? (
    <div>
      <span>Category:&nbsp;</span>
      <Select
        defaultValue={{ value: 'all-crime', label: 'All crime' }}
        options={categories}
        // When we pick a category, we'll request a new set of reports
        // Granted, we don't have to do this and could just filter through
        // already received reports (because the first request will give us ALL reports for the month)
        // but if we are to expand this app and count for pagination (which the API doesn't do anyway),
        // then having this here is nice
        onChange={({ value }) => {
          dispatch(getReports(value));
        }}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CategoriesDropdown;
