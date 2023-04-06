import React, { useEffect, useState } from 'react';
import ConnectionBar from '../componets/ConnectionBar';
import Header from '../componets/Header';
import DataTable from '../componets/DataTable';
import selectAppRoute from '../utils/appRouteUtils';
import Cookies from 'js-cookie';
import { useAuthApiContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

// TODO - Refactor - Create HOC for Handling views
function DashboardView() {
  // Context.
  const { login } = useAuthApiContext();
  // Hooks.
  const navigate = useNavigate();
  // State.
  const [token, setToken] = useState(Cookies.get('token'));


  // LifeCycle.
  useEffect(() => {
    if (!token) {
      navigate(selectAppRoute('login'));
    } else {
      login(token);
    }
  }, [token, login, navigate]);
  return (
    <div>
      <Header />
      <ConnectionBar />
      <div style={{ height: 'calc(100vh - 260px)' }}>
        <DataTable />
      </div>
    </div>
  );
}

export default DashboardView;
