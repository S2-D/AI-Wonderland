import React, { useState } from 'react';
import ToolbarStyle from './ToolbarStyle.css';
import { Link } from 'react-router-dom';

function Toolbar() {
  return (
    <>
      <nav className="toolbar">
        <ul className="toolwrap">
          <li>
            <Link to="/main" className="homeIcon">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="timegram">
              Timegram
            </Link>
          </li>
          <li>
            <Link to="/" className="search">
              Search
            </Link>
          </li>
          <li>
            <Link to="/" className="scrapbook">
              Scrapbook
            </Link>
          </li>
          <li>
            <Link to="/" className="mypage">
              My Page
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Toolbar;
