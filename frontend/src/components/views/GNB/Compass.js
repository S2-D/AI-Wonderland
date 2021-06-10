import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, Route } from 'react-router-dom';
import CompassStyle from './CompassStyle.css';
import baseUrl from '../../../url/http';
import axios from 'axios';

function Compass() {
  const history = useHistory();
  //유저의 Url 위치를 알려주는 코드
  const pathname = location.pathname;
  const URL = 'localhost:3000';

  const locationWhole = pathname
    .concat(' >')
    .replace('/', '')
    .split('/')
    .join(' > ');

  const firstLocation = pathname.split('/')[1];
  const secondLocation = pathname.split('/')[2];
  const thirdLocation = pathname.split('/')[3];
  const fourthLocation = pathname.split('/')[4];

  const Location = [
    firstLocation,
    secondLocation,
    thirdLocation,
    fourthLocation,
  ];

  const initialPage = '/' + Location[0];
  const backPage1 = '/' + Location[0] + '/' + Location[1];
  const backPage2 = '/' + Location[0] + '/' + Location[1] + '/' + Location[2];
  const backPage3 =
    '/' +
    Location[0] +
    '/' +
    Location[1] +
    '/' +
    Location[2] +
    '/' +
    Location[3];

  const UserLocationHandler1 = () => {
    history.push(`${initialPage}`);
    console.log(firstLocation);
  };

  const UserLocationHandler2 = () => {
    history.push(`${backPage1}`);
    console.log(backPage1);
  };

  const UserLocationHandler3 = () => {
    history.push(`${backPage2}`);
    console.log(backPage2);
  };

  const UserLocationHandler4 = () => {
    history.push(`${backPage3}`);
    console.log(backPage3);
  };

  return (
    <div className="compass">
      <div onClick={UserLocationHandler1}>{firstLocation}</div>
      <div onClick={UserLocationHandler2}>{secondLocation}</div>
      <div onClick={UserLocationHandler3}>{thirdLocation}</div>
      <div onClick={UserLocationHandler4}>{fourthLocation}</div>
    </div>
  );
}

export default Compass;
