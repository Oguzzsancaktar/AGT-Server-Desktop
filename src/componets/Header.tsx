import React from 'react';
import { Layout } from 'antd';
import dotnetLogo from '../../assets/dotnet-logo.svg';

const { Header: AntdHeader } = Layout;

function Header() {
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
      </div>
    </AntdHeader>
  );
}

export default Header;
