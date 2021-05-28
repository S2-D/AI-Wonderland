/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import { withRouter } from 'react-router-dom';
import Main from './Main.css';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';

function MainPage() {
  const contentStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    weight: '100vh',
  };

  return (
    <>
      <GNB />
      <div className="topItems">
        <h2>TOP 4 items</h2>
      </div>
      <div className="container" style={contentStyle}>
        <div>
          <Footer />
        </div>
        <div>
          <Toolbar />
        </div>
      </div>
    </>
  );
}

export default withRouter(MainPage);
