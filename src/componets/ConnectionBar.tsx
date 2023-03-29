import React from 'react';
import Input from 'antd/es/input/Input';
import { Button } from 'antd/es/radio';
import getIcon from 'constants/icons';

function InputPrefix() {
  return (
    <div
      className="h-full flex-row items-center "
      style={{ marginRight: '30px' }}
    >
      <span style={{ marginRight: '10px', height: '17px' }}>
        <img src={getIcon('world')} alt="World Icon" />
      </span>
      <span style={{ color: 'white', fontWeight: 'bold' }}>URL</span>
    </div>
  );
}

function ConnectionBar() {
  return (
    <div className="wrapper bg-lightBlue" style={{ height: '100px' }}>
      <div className="container h-full flex-row items-center justify-between ">
        <Input
          prefix={<InputPrefix />}
          className="bg-none"
          style={{
            height: '60px',
            padding: '0 30px',
            borderWidth: '2px',
            marginRight: '20px',
          }}
          classes={{ input: 'bg-none' }}
          placeholder="Enter connection URL..."
        />
        <Button
          className=" bg-none text-center text-bold text-white flex-col justify-center"
          style={{
            height: '60px',
            width: '300px',
            borderWidth: '2px',
            borderRadius: '10px',
          }}
          prefixCls="button-disable-before"
        >
          Conntect
        </Button>
      </div>
    </div>
  );
}

export default ConnectionBar;
