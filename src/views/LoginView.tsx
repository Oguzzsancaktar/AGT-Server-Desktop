import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Input from 'antd/es/input/Input';
import Button from 'antd/es/button';
import getIcon, { IIcons } from '../constants/icons';
import { useAuthApiContext } from '../contexts/authContext';
import { Form } from 'antd';
import IUserToken from '../models/entities/auth/IUserToken';
import selectAppRoute from '../utils/appRouteUtils';
import dotnetLogoVertical from '../assets/dotnet-logo-vertical.svg';

function InputPrefix(text: string, icon: IIcons) {
  return (
    <div
      className="h-full flex-row items-center "
      style={{ marginRight: '30px', width: '100px' }}
    >
      <span style={{ marginRight: '10px', height: '17px' }}>
        <img src={getIcon(icon)} alt={`${icon} Icon`} />
      </span>
      <span style={{ color: 'white', fontWeight: 'bold' }}>{text}</span>
    </div>
  );
}

function LoginView() {
  // Hooks.
  const navigate = useNavigate();
  const { login } = useAuthApiContext(); // Custom Hook.
  // State.
  // Memorized variables.
  const [token, setToken] = useState(Cookies.get('token'));

  // Methods.
  const onFinish = (values: IUserToken) => {
    const str = JSON.stringify(values);
    const tkn = login(str);
    setToken(tkn);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Effects.
  useEffect(() => {
    if (token) {
      navigate(selectAppRoute('home'));
    }
  }, [token, navigate]);

  return (
    <div className="login__container">
      <div className="login__form">
        <img
          style={{ marginBottom: '6rem' }}
          src={dotnetLogoVertical}
          alt="Dotnet Logo Vertical"
        />

        <Form
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: '100%' }}
        >
          <Form.Item name="email" style={{ margin: 0 }}>
            <Input
              prefix={InputPrefix('E-mail', 'email')}
              className="bg-none"
              style={{
                borderWidth: '2px',
                height: '60px',
                marginBottom: '1.5rem',
              }}
              classes={{ input: 'bg-none' }}
              placeholder="Enter connection Email..."
            />
          </Form.Item>

          <Form.Item name="password" style={{ margin: 0 }}>
            <Input
              type="password"
              prefix={InputPrefix('Password', 'lock')}
              className="bg-none"
              style={{
                borderWidth: '2px',
                height: '60px',
                marginBottom: '1.5rem',
              }}
              classes={{ input: 'bg-none' }}
              placeholder="Enter connection Password..."
            />
          </Form.Item>

          <Form.Item
            name="url"
            rules={[{ required: true, message: 'Please input your URL!' }]}
            style={{ margin: 0 }}
          >
            <Input
              prefix={InputPrefix('URL', 'world')}
              className="bg-none"
              style={{
                borderWidth: '2px',
                height: '60px',
                marginBottom: '1.5rem',
              }}
              classes={{ input: 'bg-none' }}
              placeholder="Enter connection URL..."
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className=" bg-lightBlue border-lightBlue text-center text-bold text-white flex-col justify-center"
              style={{
                borderWidth: '2px',
                borderRadius: '10px',
                height: '60px',
                marginTop: '3rem',
                width: '100%',
              }}
              prefixCls="button-disable-before"
            >
              <b className="text-center w-full">Conntect</b>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginView;
