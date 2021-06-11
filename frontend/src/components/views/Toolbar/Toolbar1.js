import React, { useState } from 'react';
import ToolbarStyle from '../../../../public/css/ToolbarStyle.css';
import { Link, useHistory } from 'react-router-dom';
import BaseUrl from '../../../url/http';
import { set } from 'react-hook-form';

function Toolbar() {
  const history = useHistory();
  const pathname = location.pathname;
  const firstLocation = pathname.split('/')[1];

  const handleHome = () => {
    history.push('/main');
  };

  const handleTimegram = () => {
    history.push('/timegram');
  };

  // const handleSearch = () => {
  //   history.push('/search');
  // };

  const handleScrapbook = () => {
    history.push('/scrapbook');
  };

  const handleMypage = () => {
    history.push('/mypage');
  };

  return (
    <>
      <nav className="toolbar">
        <ul className="toolwrap">
          <li>
            <button
              type="button"
              className={
                'homeIcon' + (firstLocation === 'main' ? '_touched' : '')
              }
              onClick={handleHome}
            >
              Main
            </button>
          </li>
          <li>
            <button
              type="button"
              className={
                'timegram' + (firstLocation === 'timegram' ? '_touched' : '')
              }
              onClick={handleTimegram}
            >
              Timegram
            </button>
          </li>
          {/* <li>
            <button
              type="button"
              className={
                'search' + (firstLocation === 'search' ? '_touched' : '')
              }
              onClick={handleSearch}
            >
              Search
            </button>
          </li> */}
          <li>
            <button
              type="button"
              className={
                'scrapbook' + (firstLocation === 'scrapbook' ? '_touched' : '')
              }
              onClick={handleScrapbook}
            >
              Scrapbook
            </button>
          </li>
          <li>
            <button
              type="button"
              className={
                'mypage' + (firstLocation === 'mypage' ? '_touched' : '')
              }
              onClick={handleMypage}
            >
              My Page
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Toolbar;
