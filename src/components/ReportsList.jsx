import React from 'react';
import Report from './Report';
import { useReports } from './hooks';

const ReportsList = () => {
  const { reports, loading } = useReports();

  // If we had a pagination, the loading flag would both show the initial
  // request state and the pagination request. Since the API doesn't implement
  // pagination, we can just replace the entire list with the loading indicator
  // whenever the loading flag changes
  if (loading) {
    return <div className="reports-list empty">Loading...</div>;
  }

  if (Array.isArray(reports) && reports.length === 0) {
    return (
      <div className="reports-list empty">
        No reports for given date in selected category
      </div>
    );
  }

  return reports ? (
    <div className="reports-list">
      {reports.map((report) => (
        // The id property is a database ID, which works nicely as a key for iterables
        <Report key={report.id} report={report} />
      ))}
    </div>
  ) : null;
};

export default ReportsList;
