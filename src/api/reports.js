// This requires an explanation:
// The API method takes a date and a police force.
// Normally they would be passed into this function as arguments,
// however, the task explicitly gives us Surrey and January 2020,
// so I'll let myself cheat a little and set them as default values.
// At least this way, if we want to expand the app, it would take little
// change to do so.
//
// I do the same thing in ../categories.js

import { get } from './index';

const serverUri = process.env.REACT_APP_POLICE_API_URI;

export const getReports = async (
  category = 'all-crime',
  force = 'surrey',
  date = '2020-01'
) => {
  // I could use something like URLSearchParams, which I often do in larger projects
  // but this is a mere prototype, so this will do
  const uri = `${serverUri}/crimes-no-location?category=${category}&force=${force}&date=${date}`;

  return get(uri);
};
