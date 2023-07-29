import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button,message, Checkbox, Alert } from 'antd';
import { AuthContext } from '../../../AuthContext/AuthaContext';

const Login = () => {
  const [error, setError] = useState('');
  const { loginUser, googleSignIn, githubSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      await loginUser(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/');
      message.success('welcome')
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    
    <section className='w-[60%] mx-auto'>
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold">Login now!</h1>
          {error && <Alert message={error} type="error" showIcon className="py-6" />}
        </div>
        <div className="">
          <Form
            className="card-body"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}            
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center my-2">
            <h1>OR</h1>
          </div>
          <div className=" flex flex-row gap-5 justify-center">
            <Button
              type="default"
              className="btn-circle btn-outline font-extrabold hover:text-red-500"
              onClick={handleGoogleSignIn}
            >
              G
            </Button>
            
          </div>
        </div>
    </section>
    
  );
};

export default Login;
