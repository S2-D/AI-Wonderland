import React from 'react';
import { Link } from 'react-router-dom';
import CompassStyle from './CompassStyle.css';
import LogoutButton from './Logout_button';

function Compass() {
  //유저의 Url 위치를 알려주는 코드
  const pathname = location.pathname;

  //첫글자만 대문자로 뽑아주는 코드
  const firstLetter = pathname.charAt(1).toUpperCase();

  const restWords = pathname.slice(2);

  const userLocation = (firstLetter + restWords).concat(' >').replace('/', '');

  return (
    <div className="compass">
      <Link to={pathname}>
        <p>{userLocation}</p>
      </Link>
      <LogoutButton />
    </div>
  );
}

export default Compass;