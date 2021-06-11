/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../url/http';

import Main from '../../../../public/css/Main.css';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';
import MainSlider from './Slider';
import Top from './Top';
import Bottom from './Bottom';
import Shoes from './Shoes';
import Etc from './Etc';
import MainNavBar from './MainNavBar';

export default function MainPage() {
  return (
    <>
      <div
        className="w-full"
        style={{
          paddingBottom: '65px',
        }}
      >
        <GNB />
        <MainNavBar />
        <MainSlider />
        <div className="mainItemcontainer">
          <div className="topItems_Tops">
            <h2>TOP 4 items by Tops</h2>
            <p className="subAd">Explore the best items of the Tops.</p>
            <Top />
          </div>
          <div className="topItems_Bottoms">
            <h2>TOP 4 items by Bottoms</h2>
            <p className="subAd">Looks chic but comfy!</p>
            <Bottom />
          </div>
          <div className="topItems_Shoes">
            <h2>TOP 4 items by Shoes</h2>
            <p className="subAd">Classic never goes out of style.</p>
            <div>
              <Shoes />
            </div>
            <div className="topItems_Others">
              <h2>TOP 4 items by Others</h2>
              <p className="subAd">Accessories that make you shine!</p>
              <Etc />
            </div>
          </div>
        </div>
        <Footer />
        <Toolbar />
      </div>
    </>
  );
}
