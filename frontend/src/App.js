import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';

import './App.css';
import InfiniteScrolling from './pages/InfiniteScrolling/InfiniteScrolling';
import Intro from './pages/Intro/Intro';
import LoginExample from './pages/Login/LoginExample';

function App() {
  return (
    <Router>
      <Switch>
        {/* 인트로 페이지  연결 */}
        <Route exact path="/" component={Intro} />
        {/* 무한 스크롤링 페이지 예시 연결 */}
        <Route exact path="/scrolling" component={InfiniteScrolling} />
        <Route exact path="/Login" component={LoginExample} />
      </Switch>
    </Router>
  );
}

export default App;
