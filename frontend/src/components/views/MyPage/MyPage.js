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
      <div>
        <GNB />
        <Info />
        <div
          className="grid grid-col-4 justify-left"
          style={{
            textDecoration: 'none',
          }}
        >
          <div
            className="col-span-2 justify-center p-4"
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              fontFamily: 'light_p',
              backgroundColor: '#13F2C9',
            }}
          >
            <img
              src="./images/icon_img/scrapbook_touch.png"
              style={{
                width: '26px',
              }}
              className="float-left"
            />
            <Link
              to="/scrapbook"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              My Scrapbook
            </Link>
          </div>
          <div
            className="col-span-2 justify-center p-4"
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              fontFamily: 'light_p',
              backgroundColor: '#13F2C9',
            }}
          >
            <img
              src="./images/icon_img/timegram_touch.png"
              className="float-left"
              style={{
                width: '26px',
              }}
            />
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              My Lookbook
            </Link>
          </div>
          <div
            className="col-span-2 justify-center p-4"
            style={{
              textAlign: 'center',
              fontFamily: 'light_p',
              backgroundColor: '#13F2C9',
            }}
          >
            <img
              src="./images/icon_img/stamp_moving.gif"
              className="float-left"
              style={{
                width: '30px',
              }}
            />
            <Link
              to="/attendance"
              style={{
                textDecoration: 'none',
                color: 'black',
                marginTop: '5px',
              }}
            >
              Check-in
            </Link>
          </div>
          <div
            className="col-span-2 justify-center p-4"
            style={{
              textAlign: 'center',
              backgroundColor: '#187FD9',
              fontFamily: 'light_p',
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
