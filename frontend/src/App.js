import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// 최상위 컴포넌트에 적용해주면 일괄 적용 가능함

import InfiniteScrolling from './pages/InfiniteScrolling/InfiniteScrolling';
import Intro from './pages/Intro/Intro';
import LoginExample from './pages/Login/LoginExample';
import ProductList from './pages/Product/ProductList';
import ProductCategory from './pages/ProductCategory/ProductCategory';

function App() {
  return (
    <Router>
      <Switch>
        {/* 인트로 페이지  연결 */}
        <Route exact path="/" component={Intro} />
        {/* 무한 스크롤링 페이지 예시 연결 */}
        <Route exact path="/scrolling" component={InfiniteScrolling} />
        <Route exact path="/login" component={LoginExample} />
        <Route exact path="/productList" component={ProductList} />
        <Route exact path="/productCategory" component={ProductCategory} />
      </Switch>
    </Router>
  );
}

export default App;
