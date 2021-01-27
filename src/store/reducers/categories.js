const initialState = {
  categories: null,
  loading: false,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'categories/pending':
      return { ...state, loading: true };
    case 'categories/fulfilled':
      return { categories: action.payload, loading: false };
    case 'categories/rejected':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default categoriesReducer;
