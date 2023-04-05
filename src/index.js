import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './App';
import ForgotPassword from './forgot-password';

// import 'antd/dist/antd.css';



ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<LoginForm />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<LoginForm />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

