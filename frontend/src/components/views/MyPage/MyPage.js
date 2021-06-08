import React from 'react';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import Logout from '../LoginPage/Logout';
import Info from './Info';
import MyPageStyle from './MyPageStyle.css';

function MyPage() {
  return (
    <>
      <div>
        <GNB />
        <Info />
        <div
          className="grid grid-row-4 inline-block align-text-middle"
          style={{
            textDecoration: 'none',
          }}
        >
          <div
            className="row-span-1 align-middle p-4 transform"
            style={{
              textDecoration: 'none',
              fontFamily: 'light_p',
              backgroundColor: '#87F2CC',
            }}
          >
            <Link
              to="/scrapbook"
              style={{ textDecoration: 'none', color: 'hotpink' }}
            >
              My Scrapbook &gt;
              <img
                src="./images/icon_img/scrapbook_menu.png"
                style={{
                  width: '40px',
                }}
              />
            </Link>
          </div>
          <div
            className="row-span-1 p-4"
            style={{
              textDecoration: 'none',
              fontFamily: 'light_p',
              backgroundColor: '#87F2CC',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'hotpink' }}>
              My Lookbook &gt;
              <img
                src="./images/icon_img/timegram_menu.png"
                style={{
                  width: '40px',
                }}
              />
            </Link>
          </div>
          <div
            className="row-span-1 align-text-middle p-4"
            style={{
              fontFamily: 'light_p',
              backgroundColor: '#87F2CC',
            }}
          >
            <Link
              to="/attendance"
              style={{
                textDecoration: 'none',
                color: 'hotpink',
              }}
            >
              Check-in &gt;
              <img
                src="./images/icon_img/stamp_moving.gif"
                style={{
                  width: '36px',
                }}
              />
            </Link>
          </div>
          <div
            className="row-span-1 p-4"
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
