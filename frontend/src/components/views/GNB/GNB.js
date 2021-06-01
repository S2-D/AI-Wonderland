import React from 'react';
import GNBStyle from './GNBStyle.css';
import { Link } from 'react-router-dom';

function GNB() {
  return (
    <>
      <div className="gnb_container">
        <div className="left_container">
          <Link to="/main" className="gnb_logo">
            <img src="/images/logo.png" className="logo" />
          </Link>
        </div>
        <div className="right_container">
          <img
            src="./images/icon_img/coin_move.gif"
            className="coin_img"
            width="35px"
          />
          <div className="wallet">$100,000</div>
        </div>
      </div>
      <div className="compass">
        <Link to="/main">
          <p>Main</p>
        </Link>
      </div>
    </>
  );
}

export default GNB;
