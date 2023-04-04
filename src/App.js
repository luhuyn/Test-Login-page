import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import './App.css';
import { Form, Input, Button } from 'antd';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleFieldsChange = () => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    setIsSubmitDisabled(!isFormValid);
  };

  return (
    <div className="container">
      <div className="login-wrapper h-full flex justify-end">
        <div className="w-1/3">
          <div>
            <h3 className="login-title">Login</h3>
          </div>
          <div className="w-full">
            <Form
              form={form}
              name="login"
              onFinish={handleFinish}
              onFieldsChange={handleFieldsChange}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please input your username!' }]}
                className="custom-label"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please input your password!' }]}
                className="custom-label"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <a href=""><span>Forgot Password?</span></a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full" disabled={isSubmitDisabled}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

ReactDOM.render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>,
  document.getElementById('root')
);
