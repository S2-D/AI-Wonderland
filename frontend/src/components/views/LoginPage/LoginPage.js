/* eslint-disable no-undef */
import react from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

import baseUrl from '../../../url/http';
import LoginPageStyle from './LoginPageStyle.css';

function LoginPage({ setLoginUserId }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginFormPost = (data) => {
    axios.post(baseUrl + '/member/signIn/', data).then((response) => {
      if (response.data.status === 'success') {
        console.log(response.data);
        const access_token = response.data.token;
        localStorage.setItem('access_token', access_token);
        // setLoginUserId(response.data.token);
        history.push('/main');
      } else {
        alert(response.data.result.error);
        document.getElementById('password').focus();
      }
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    loginFormPost(data);
  };

  const onClickSignup = () => {
    history.push('/register');
  };

  return (
    <Form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <Form.Label>Email</Form.Label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="email"
        defaultValue=""
        {...register('email', { required: true })}
      />
      {errors.email && <p>Please enter your email.</p>}

      {/* 비밀번호 */}
      <Form.Label>비밀번호</Form.Label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        {...register('password', { required: true, maxLength: 10 })}
      />
      {errors.password && <p>Please enter your password.</p>}

      {/* login button */}
      <input className="btnLogin" type="submit" value="Login" />
      <p>If you don't have ID, click the button "Sign Up"!</p>
      <input
        className="btnSignup"
        type="button"
        value="Sign Up"
        onClick={onClickSignup}
      />
    </Form>
  );
}

export default LoginPage;
