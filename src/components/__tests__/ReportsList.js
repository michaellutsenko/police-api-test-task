import { render, screen, cleanup, waitFor } from '@testing-library/react';
import ReportsList from '../ReportsList';

jest.mock('react-redux');
jest.mock('../hooks');
jest.mock('../Report', () => ({
  __esModule: true,
  default: () => 'Report',
}));

describe('ReportsList', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test('renders nothing before the first actions taken', async () => {
    // Emulating the return value of custom hooks. We don't have to test the
    // hooks themselves here, better write tests specifically for them
    jest
      .spyOn(require('../hooks'), 'useReports')
      .mockImplementation(() => ({ reports: null, loading: false }));

    render(<ReportsList />);

    expect(() => screen.getByTestId('reportsList')).toThrow();
  });

  test('renders the loading indicator while the request is pending', async () => {
    jest
      .spyOn(require('../hooks'), 'useReports')
      .mockImplementation(() => ({ reports: null, loading: true }));

    render(<ReportsList />);

    expect(() => screen.getByText(/Loading/)).not.toThrow();
  });

  test('renders the list of reports when the requests are resolved', async () => {
    jest.spyOn(require('../hooks'), 'useReports').mockImplementation(() => ({
      reports: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      loading: false,
    }));

    render(<ReportsList />);

    expect(screen.queryByText(/Report/)).not.toBe(null);
  });

  test('requests new reports on initial render', async () => {
    // This is complicated logic and it'll require a complicated setup
    // 1. Restore the original useReports hook
    const { useReports } = jest.requireActual('../hooks');
    jest
      .spyOn(require('../hooks'), 'useReports')
      .mockImplementation(useReports);
    // 2. Create a fake fetch()
    const fakeFetch = jest.spyOn(global, 'fetch').mockImplementation((uri) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    // 3. Mock react-redux's useSelector
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockImplementation(() => ({
        // We only care about categories being a "truthy" value. An empty object will do
        categories: {},
        reports: null,
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

    render(<ReportsList />);

    expect(fakeFetch).toHaveBeenCalledTimes(1);
    expect(fakeFetch.mock.calls[0][0]).toMatch(/crimes-no-location/);
  });
});
