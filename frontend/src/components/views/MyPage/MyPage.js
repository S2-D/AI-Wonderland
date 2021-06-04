import React from 'react';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import Wallet from '../GNB/Wallet';
import Logout from '../LoginPage/Logout';

function MyPage() {
  return (
    <>
      <GNB />
      <div className="grid grid-rows-2 grid-flow-col justify-center">
        <div
          className="userInfo"
          style={{
            backgroundColor: 'yellow',
          }}
        >
          <div className="col-span-2 w-40 h-40 p-4 flex">
            <img
              src="./images/icon_img/anonymous.png"
              style={{
                borderRadius: '50%',
                backgroundColor: 'pink',
              }}
            />
          </div>
          <div
            className="col-span-1"
            style={{
              textAlign: 'center',
            }}
          >
            <span>Nickname</span>
          </div>
          <div
            className="col-span-1"
            style={{
              textAlign: 'center',
            }}
          >
            <span>Email</span>
          </div>
          <div
            className="col-span-1"
            style={{
              textAlign: 'center',
            }}
          >
            <Wallet />
          </div>
        </div>
        <div className="gird grid-row-4 grid-col-4 gap-4 justify-center">
          <div
            className="col-span-2"
            style={{
              textAlign: 'right',
            }}
          >
            <Link to="/scrapbook">My Scrapbook</Link>
          </div>
          <div
            className="col-span-2"
            style={{
              textAlign: 'right',
            }}
          >
            <Link to="/">My Lookbook</Link>
          </div>
          <div
            className="col-span-2"
            style={{
              textAlign: 'right',
            }}
          >
            <Link to="/attendance">Check-in</Link>
          </div>
          <div
            className="col-span-2"
            style={{
              textAlign: 'center',
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
