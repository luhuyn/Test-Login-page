import React, { useState} from 'react';
import './App.css';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { message } from 'antd';

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);
  const [isReceiveOtpDisabled, setIsReceiveOtpDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleFinish = (values) => {
    console.log('Received values:', values);
    // Send a request to the server to verify the email and OTP
    fetch('/verify-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid email or OTP');
      }
      // If the response is successful, redirect the user to the reset password page
      window.location.href = '/reset-password';
    })
    .catch(error => {
      console.error(error);
      // Display an error message to the user
      message.error('Invalid email or OTP');
    });
  };

  const handleFieldsChange = () => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    const isEmailValid = form.getFieldValue('email') !== undefined && form.getFieldValue('email') !== '';
    const isOtpValid = form.getFieldValue('otp') !== undefined && form.getFieldValue('otp') !== '';
    setIsReceiveOtpDisabled(!isEmailValid);
    setIsVerifyDisabled(!isFormValid || !isEmailValid || !isOtpValid);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(!!event.target.value);
  };
  const handleReceiveOtpClick = () => {
    // Send a request to the server to send the OTP to the user's email
    fetch('/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send OTP');
        }
        // If the response is successful, set the OTP state
        setOtp('123456'); // Replace with the actual OTP received from the server
      })
      .catch(error => {
        console.error(error);
        // Display an error message to the user using Antd message component
        message.error('Failed to send OTP');
      });
  };

  return (
    <div className="container">
      <div className="forgot-password-wrapper h-full flex justify-end">
        <div className="w-1/3">
          <div>
            <h3 className="forgot-password-title">Forgot Password</h3>
          </div>
          <div className="w-full">
            <Form
              form={form}
              name="forgot-password"
              onFinish={handleFinish}
              onFieldsChange={handleFieldsChange}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input onChange={handleEmailChange}/>
              </Form.Item>

              <Form.Item
                label="OTP"
                name="otp"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please input your OTP!' }]}
              >
                <Input disabled={!isEmailValid}/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="button" className="receive-otp-button w-full" disabled={isReceiveOtpDisabled} onClick={handleReceiveOtpClick}>
                  Receive OTP
                </Button>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="verify" className="verify-button w-full" disabled={isVerifyDisabled}>
                  Verify
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            <Link className="back-to-login-link" to="/">
            <ArrowLeftOutlined className="back-icon" style={{ marginRight: '10px' }} />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
