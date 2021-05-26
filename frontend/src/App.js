import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import InfiniteScrolling from './pages/InfiniteScrolling/InfiniteScrolling';
import Intro from './pages/Intro/Intro';
import LoginExample from './pages/Login/LoginExample';

function App() {
  return (
    <Router>
      {/* 인트로 페이지  연결 */}
      <Route path="/" component={Intro} />
      {/* 무한 스크롤링 페이지 예시 연결 */}
      <Route path="/scrolling" component={InfiniteScrolling} />
      <Route path="/Login" component={LoginExample} />
    </Router>
  );
}

export default App;
