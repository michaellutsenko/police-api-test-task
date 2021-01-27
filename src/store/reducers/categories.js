const initialState = {
  categories: null,
  loading: false,
};

// When we receive categories, we want to convert them into a format
// that's readable for react-select
const convertCategoriesIntoOptions = (categories) => {
  return categories.map((category) => ({
    value: category.url,
    label: category.name,
  }));
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'categories/pending':
      return { ...state, loading: true };
    case 'categories/fulfilled':
      return {
        categories: convertCategoriesIntoOptions(action.payload),
        loading: false,
      };
    case 'categories/rejected':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default categoriesReducer;
