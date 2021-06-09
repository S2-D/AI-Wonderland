/* eslint-disable no-undef */
import react from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
      if (response.data.message === '로그인에 성공하였습니다.') {
        console.log(response.data);
        const access_token = response.data.token;
        localStorage.setItem('access_token', access_token);
        // setLoginUserId(response.data.token);
        history.push('/main');
      } else {
        alert(
          "Please check the input values! If you don't have an Id, please register!"
        );
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
    <div className="loginContainer">
      <div className="loginInfoBox">
        <div className="grid grid-row-5">
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="row-span-1 p-2">
              <img
                src="./images/new_logo_blue.png"
                className="loginLogo"
                style={{ backgroundColor: 'white' }}
              />
              <span>AI WONDERLAND</span>
            </div>
            <div className="row-span-2 p-2">
              {/* Email */}
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                defaultValue=""
                {...register('email', { required: true })}
              />
              {errors.email && <p>Please enter your email.</p>}
            </div>

            <div className="row-span-3 p-2">
              {/* 비밀번호 */}
              <label>비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                {...register('password', { required: true, maxLength: 10 })}
              />
              {errors.password && <p>Please enter your password.</p>}
            </div>
            <div className="row-span-4 p-2">
              {/* login button */}
              <input className="btnLogin" type="submit" value="Login" />
            </div>
            <div className="row-span-5 p-2">
              <p>If you don't have ID, click the button "Sign Up"!</p>
              <input
                className="btnSignup"
                type="button"
                value="Sign Up"
                onClick={onClickSignup}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
