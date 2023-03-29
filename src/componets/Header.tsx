import React from 'react';
import { Layout } from 'antd';
import getIcon from 'constants/icons';
import { useAuthApiContext, useAuthStateContext } from 'contexts/authContext';
import { useNavigate } from 'react-router-dom';
import selectAppRoute from 'utils/appRouteUtils';
import dotnetLogo from '../../assets/dotnet-logo.svg';

const { Header: AntdHeader } = Layout;

function Header() {
  // Hooks.
  const { loggedUser } = useAuthStateContext();
  const navigate = useNavigate();
  const { logout } = useAuthApiContext();

  const handleLogout = () => {
    logout();
    navigate(selectAppRoute('login'));
  };

  return (
    <AntdHeader
      style={{
        height: '160px',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}
      className=" bg-darkBlue wrapper"
    >
      <div className="h-full flex-row justify-between items-center container">
        <img src={dotnetLogo} alt="Dotnet Logo" />

        <div className="flex-row justify-between items-center">
          <div style={{ height: '60px' }}>
            <div
              className="flex-row justify-between items-center"
              style={{ height: '30px' }}
            >
              <img src={getIcon('user')} alt="user icon" />
              <span
                className="text-white text-27"
                style={{ marginLeft: '10px' }}
              >
                User
              </span>
            </div>
            <div
              className="flex-row justify-between items-center"
              style={{ height: '30px' }}
            >
              <span className="text-white text-19">email</span>
            </div>
          </div>

          <div
            className="bordered rounded border-white flex-row items-center justify-center cursor-pointer"
            style={{ height: '60px', width: '60px', marginLeft: '5rem' }}
            onClick={handleLogout}
          >
            <img src={getIcon('logout')} alt="logout icon" />
          </div>
        </div>
      </div>
    </AntdHeader>
  );
}

export default Header;
