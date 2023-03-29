import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardView from 'views/DashboardView';
import './App.css';
import LoginView from 'views/LoginView';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </Router>
  );
}
