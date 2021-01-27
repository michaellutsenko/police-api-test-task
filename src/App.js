import './App.css';
import CategoriesDropdown from './components/CategoriesDropdown';
import ReportsList from './components/ReportsList';

function App() {
  return (
    <div className="app">
      <h1>Police reports</h1>
      <CategoriesDropdown />
      <ReportsList />
    </div>
  );
}

export default App;
