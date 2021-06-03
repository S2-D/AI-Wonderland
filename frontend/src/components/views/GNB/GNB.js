import React from 'react';
import GNBStyle from './GNBStyle.css';
import { Link } from 'react-router-dom';
import Compass from './Compass';

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
          <div className="wallet">$100,000</div>
        </div>
      </div>
      <Compass />
    </>
  );
}

export default GNB;
