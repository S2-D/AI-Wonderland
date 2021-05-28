/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';

function LandingPage(props) {
  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        props.history.push('/login');
      } else {
        alert('Failed to logout. Please try again.');
      }
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
      <Toolbar />
    </div>
  );
}

export default withRouter(LandingPage);
