/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import { withRouter } from 'react-router-dom';

function MainPage() {
  return <h2>Hello, this is main page.</h2>;
}

export default withRouter(MainPage);
