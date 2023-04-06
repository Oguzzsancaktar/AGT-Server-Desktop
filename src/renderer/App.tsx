import React, { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardView from '../views/DashboardView';
import LoginView from '../views/LoginView';
import Cookies from 'js-cookie';


export default function App() {
  useEffect(() => {
    window.renderer.sendGetLoggedAccountMessage()
  }, [window.renderer])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </Router>
  );
}
