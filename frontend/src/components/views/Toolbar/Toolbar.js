import React, { useState } from 'react';
import ToolbarStyle from './ToolbarStyle.css';
import { Link } from 'react-router-dom';

function Toolbar() {
  const [homeicon, setHomeIconState] = useState(false);
  const [timegramicon, setTimeIconState] = useState(false);
  const [searchicon, setSearchIconState] = useState(false);
  const [scrapicon, setScrapIconState] = useState(false);
  const [myicon, setMyIconState] = useState(false);

  const handleHomeIconTouched = () => {
    setHomeIconState(!homeicon);
  };

  const handleTimeIconTouched = () => {
    setTimeIconState(!timegramicon);
  };

  const handleSearchIconTouched = () => {
    setSearchIconState(!searchicon);
  };

  const handleScrapIconTouched = () => {
    setScrapIconState(!scrapicon);
  };

  const handleMyIconTouched = () => {
    setMyIconState(!myicon);
  };

  return (
    <>
      <nav className="toolbar">
        <ul className="toolwrap">
          <li>
            <Link
              to="/main"
              className={'homeIcon' + (!homeicon ? '' : '_touched')}
              onClick={handleHomeIconTouched}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={'timegram' + (!timegramicon ? '' : '_touched')}
              onClick={handleTimeIconTouched}
            >
              Timegram
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={'search' + (!searchicon ? '' : '_touched')}
              onClick={handleSearchIconTouched}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={'scrapbook' + (!scrapicon ? '' : '_touched')}
              onClick={handleScrapIconTouched}
            >
              Scrapbook
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={'mypage' + (!myicon ? '' : '_touched')}
              onClick={handleMyIconTouched}
            >
              My Page
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Toolbar;
