import React from 'react';
import { Link } from 'react-router-dom';
import CompassStyle from './CompassStyle.css';

function Compass() {
  //유저의 Url 위치를 알려주는 코드
  const pathname = location.pathname;

  const locationWhole = pathname
    .concat(' >')
    .replace('/', '')
    .split('/')
    .join(' > ');

  const firstLocation = pathname.split('/')[1];
  const secondLocation = pathname.split('/')[2];
  const thirdLocation = pathname.split('/')[3];
  const fourthLocation = pathname.split('/')[4];

  return (
    <div className="compass">
      <p>{locationWhole}</p>
    </div>
  );
}

export default Compass;
