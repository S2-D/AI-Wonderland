import React from 'react';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import Wallet from '../GNB/Wallet';

function MyPage() {
  return (
    <>
      <GNB />
      <div className="flow-root flow-root grid-cols-6 gap-x-2 gap-y-4 min-w-full md:min-w-full">
        <ul className="myPage_Container">
          <li className="myPage_userInfo">
            <span>
              <img
                src="./images/icon_img/anonymous.png"
                className="profileImg"
              />
            </span>
            <div>
              <p>nickname</p>
              <p>Useremail</p>
              <Wallet />
            </div>
          </li>
          <li className="myScrapbook_link">
            <Link to={'/scrapbook'}>My Scrapbook</Link>
          </li>
          <li className="myLookbook_link">
            <Link to={'/lookbook'}>My Lookbook</Link>
          </li>
          <li className="myAttendance_link">
            <Link to={'/attendance'}>Attendance</Link>
          </li>
          <li className="logOut_link">
            <button type="submit">Log Out</button>
          </li>
        </ul>
      </div>
      <Toolbar />
    </>
  );
}

export default MyPage;
