import React from 'react';
import { Link } from 'react-router-dom';
import withRouter from './withRouter';
import CompassStyle from './CompassStyle.css';

function Compass() {
  return (
    <div className="compass">
      <Link to="/main">
        <p>Main</p>
      </Link>
    </div>
  );
}

export default Compass;
