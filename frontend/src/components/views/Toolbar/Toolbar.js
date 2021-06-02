import React, { useState } from 'react';
import ToolbarStyle from './ToolbarStyle.css';
import { Link, useHistory } from 'react-router-dom';

function Toolbar() {
  const history = useHistory();
  const [homeicon, setHomeIconState] = useState(false);
  const [timegramicon, setTimeIconState] = useState(false);
  const [searchicon, setSearchIconState] = useState(false);
  const [scrapicon, setScrapIconState] = useState(false);
  const [myicon, setMyIconState] = useState(false);

  const handleHome = () => {
    setHomeIconState(!homeicon);
    history.push('/main');
  };

  const handleTimegram = () => {
    setTimeIconState(!timegramicon);
    history.push('/main');
  };

  const handleSearch = () => {
    setSearchIconState(!searchicon);
    history.push('/main');
  };

  const handleScrapbook = () => {
    setScrapIconState(!scrapicon);
    history.push('/main');
  };

  const handleMypage = () => {
    setMyIconState(!myicon);
    history.push('/main');
  };

  return (
    <>
      <nav className="toolbar">
        <ul className="toolwrap">
          <li>
            <button
              type="button"
              to="/main"
              className={'homeIcon' + (!homeicon ? '' : '_touched')}
              onClick={handleHome}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              to="/"
              className={'timegram' + (!timegramicon ? '' : '_touched')}
              onClick={handleTimegram}
            >
              Timegram
            </button>
          </li>
          <li>
            <button
              type="button"
              to="/"
              className={'search' + (!searchicon ? '' : '_touched')}
              onClick={handleSearch}
            >
              Search
            </button>
          </li>
          <li>
            <button
              type="button"
              to="/"
              className={'scrapbook' + (!scrapicon ? '' : '_touched')}
              onClick={handleScrapbook}
            >
              Scrapbook
            </button>
          </li>
          <li>
            <button
              type="button"
              to="/"
              className={'mypage' + (!myicon ? '' : '_touched')}
              onClick={handleMypage}
            >
              My Page
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Toolbar;
