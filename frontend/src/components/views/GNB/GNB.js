import React from 'react';
import GNBStyle from './GNBStyle.css';
import { Link } from 'react-router-dom';
import Compass from './Compass';
import Wallet from './Wallet';

function GNB() {
  return (
    <>
      <div className="gnb_container">
        <div className="left_container">
          <Link to="/main" className="gnb_logo">
            <img src="/images/new_logo.png" className="logo" />
            <span className="logo_text">AI Wonderland</span>
          </Link>
        </div>
        <div className="right_container">
          <div className="wallet">
            <Wallet />
          </div>
        </div>
      </div>
      <Compass />
    </>
  );
}

export default GNB;
