import React from 'react';
import { Link } from 'react-router-dom';
import GNB from '../GNB/GNB';

export default function testPage2() {
  return (
    <>
      <GNB />
      <div style={{ padding: '100px' }}>
        <Link to="/mypage/testpage1/testpage2/testpage3">testpage3</Link>
      </div>
    </>
  );
}
