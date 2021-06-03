import React from 'react';
import { Link } from 'react-router-dom';
import withRouter from './withRouter';
import CompassStyle from './CompassStyle.css';

function Compass() {
  const pathname = location.pathname;
  const userLocation = pathname.replace('/', '').concat(' >');

  return (
    <div className="compass">
      <Link to={pathname}>
        <p>{userLocation}</p>
      </Link>
    </div>
  );
}

export default Compass;
