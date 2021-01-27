import React from 'react';
import { useCategories } from './hooks';

const Report = ({ report }) => {
  // By the time this components renders we're guaranteed that
  // the category request was answered and we've received a result
  const { categories } = useCategories();

  const getCategoryName = (categoryId) => {
    const category = categories.find((x) => x.value === categoryId);
    return category ? category.label : categoryId;
  };

  return !!report ? (
    <div className="report">
      <p>
        <span className="caption">Category:&nbsp;</span>
        {getCategoryName(report.category)}
      </p>
      <p>
        <span className="caption">Outcome:&nbsp;</span>{' '}
        {report.outcome_status.category}
      </p>
      {!!report.context && <p>{report.context}</p>}
    </div>
  ) : null;
};

export default Report;
