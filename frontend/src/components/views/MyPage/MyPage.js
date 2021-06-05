import React from 'react';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import Logout from '../LoginPage/Logout';
import Info from './Info';

function MyPage() {
  return (
    <>
      <div>
        <GNB />
        <Info />
        <div className="grid grid-row-4 grid-col-4 gap-4 justify-center">
          <div
            className="col-span-2 p-2"
            style={{
              textAlign: 'right',
              textDecoration: 'none',
            }}
          >
            <Link to="/scrapbook">My Scrapbook</Link>
          </div>
          <div
            className="col-span-2 p-2"
            style={{
              textAlign: 'right',
            }}
          >
            <Link to="/">My Lookbook</Link>
          </div>
          <div
            className="col-span-2 p-2"
            style={{
              textAlign: 'right',
            }}
          >
            <Link to="/attendance">Check-in</Link>
          </div>
          <div
            className="col-span-2 p-2"
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
