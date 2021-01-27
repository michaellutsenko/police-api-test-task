import { render, screen, cleanup, waitFor } from '@testing-library/react';
import CategoriesDropdown from '../CategoriesDropdown';

jest.mock('react-redux');
jest.mock('../hooks');

describe('CategoriesDropdown', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('renders nothing before the first actions taken', async () => {
    jest
      .spyOn(require('../hooks'), 'useCategories')
      .mockImplementation(() => ({ categories: null, loading: false }));

    render(<CategoriesDropdown />);

    expect(() => screen.getByTestId('categoriesContainer')).toThrow();
  });

  test('renders the loading indicator while the request is pending', async () => {
    jest
      .spyOn(require('../hooks'), 'useCategories')
      .mockImplementation(() => ({ categories: null, loading: true }));

    render(<CategoriesDropdown />);

    expect(() => screen.getByText(/Loading/)).not.toThrow();
  });

  test('renders the dropdown after the request is resolved', async () => {
    jest.spyOn(require('../hooks'), 'useCategories').mockImplementation(() => ({
      categories: [
        { value: 1, label: 'Category 1' },
        { value: 2, label: 'Category 2' },
      ],
      loading: false,
    }));

    render(<CategoriesDropdown />);

    // Should have a "Category" label near the dropdown
    expect(() => screen.getByText(/Category/)).not.toThrow();
    // The default value in the dropdown is "All crime"
    expect(() => screen.getByText(/All crime/)).not.toThrow();
  });

  // Similar to the last test in ReportsList
  test('requests categories on initial render', async () => {
    // 1. Restore the original hook
    const { useCategories } = jest.requireActual('../hooks');
    jest
      .spyOn(require('../hooks'), 'useCategories')
      .mockImplementation(useCategories);
    // 2. Create a fake fetch()
    const fakeFetch = jest.spyOn(global, 'fetch').mockImplementation((uri) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    // 3. Mock react-redux's useSelector, emulating the initial state
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockImplementation(() => ({
        categories: null,
        loading: false,
      }));
    // 4. Create a fake dispatch function
    const fakeDispatch = jest.fn((action) => {
      action(jest.fn(), jest.fn());
    });
    // 5. Mock react-redux's useDispatch
    jest
      .spyOn(require('react-redux'), 'useDispatch')
      .mockImplementation(() => fakeDispatch);

    render(<CategoriesDropdown />);

    expect(fakeFetch).toHaveBeenCalledTimes(1);
    expect(fakeFetch.mock.calls[0][0]).toMatch(/categories/);
  });

  // Not testing the behaviour of react-select, as it's a third-party library,
  // we assume it to have been tested by its developers
});
