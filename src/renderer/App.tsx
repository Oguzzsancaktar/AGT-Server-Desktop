import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardView from 'views/DashboardView';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </Router>
  );
}
