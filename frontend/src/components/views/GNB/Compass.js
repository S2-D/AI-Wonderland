import React from 'react';
import { Link } from 'react-router-dom';
import CompassStyle from './CompassStyle.css';
import LogoutButton from './Logout_button';

function Compass() {
  //유저의 Url 위치를 알려주는 코드
  const pathname = location.pathname;

  const firstLocation = pathname
    .concat(' >')
    .replace('/', '')
    .split('/')
    .join(' > ');

  return (
    <div className="compass">
      <Link to={pathname}>
        <p>
          {firstLocation}
          <LogoutButton />
        </p>
      </Link>
    </div>
  );
}

export default Compass;
