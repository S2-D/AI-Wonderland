import React from 'react';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import Logout from '../LoginPage/Logout';
import Info from './Info';
import { waitForNone } from 'recoil';
import MyPageStyle from './MyPageStyle.css';

function MyPage() {
  return (
    <>
      <div style={{ paddingBottom: '65px' }}>
        <GNB />
        <Info />
        <div
          className="grid grid-row-4 grid-col-4 inline-block align-text-middle"
          style={{
            textDecoration: 'none',
          }}
        >
          <div
            className="row-span-1 align-middle inline-block p-2 transform"
            style={{
              textDecoration: 'none',
              fontFamily: 'light_p',
              backgroundColor: '#87F2CC',
            }}
          >
            <img
              className="inline-block"
              src="./images/icon_img/scrapbook_menu.png"
              style={{
                width: '40px',
                paddingRight: '10px',
              }}
            />
            <Link
              to="/scrapbook"
              style={{ textDecoration: 'none', color: 'hotpink' }}
            >
              My Scrapbook &gt;
            </Link>
          </div>
          <div
            className="row-span-1 p-2"
            style={{
              textDecoration: 'none',
              fontFamily: 'light_p',
              backgroundColor: '#87F2CC',
            }}
          >
            <img
              className="inline-block"
              src="./images/icon_img/timegram_menu.png"
              style={{
                width: '40px',
                paddingRight: '10px',
              }}
            />
            <Link to="/" style={{ textDecoration: 'none', color: 'hotpink' }}>
              My Lookbook &gt;
            </Link>
          </div>
          <div
            className="row-span-1 align-text-middle p-2"
            style={{
              fontFamily: 'light_p',
              backgroundColor: '#87F2CC',
            }}
          >
            <img
              className="inline-block"
              src="./images/icon_img/stamp_moving.gif"
              style={{
                width: '36px',
                paddingRight: '10px',
              }}
            />
            <Link
              to="/attendance"
              style={{
                textDecoration: 'none',
                color: 'hotpink',
              }}
            >
              Check-in &gt;
            </Link>
          </div>
          <div
            className="row-span-1 p-4 align-text-middle"
            style={{
              textAlign: 'center',
              fontFamily: 'light_p',
              backgroundColor: 'hotpink',
            }}
          >
            <Logout />
          </div>
        </div>
      </div>
      <Toolbar />
    </>
  );
}

export default MyPage;
