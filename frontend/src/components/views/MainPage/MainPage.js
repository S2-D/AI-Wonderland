/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Carousel from 'react-bootstrap/Carousel';
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

  const imgSrc = '../../../utils/images/example/';

  return (
    <>
      <GNB />
      <div className="container" style={contentStyle}>
        <div className="topItems_Tops">
          <h2>TOP 4 items by Tops</h2>
        </div>
        <div className="topItems_Bottoms">
          <h2>TOP 4 items by Bottoms</h2>
        </div>
        <div className="topItems_Shoes">
          <h2>TOP 4 items by Shoes</h2>
        </div>
        <div className="topItems_Others">
          <h2>TOP 4 items by Others</h2>
        </div>
        <Footer />
        <Toolbar />
      </div>
    </>
  );
}

export default MainPage;
