const initialState = {
  reports: null,
  loading: false,
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'reports/pending':
      return { ...state, loading: true };
    case 'reports/fulfilled':
      return { reports: action.payload, loading: false };
    case 'reports/rejected':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reportsReducer;
