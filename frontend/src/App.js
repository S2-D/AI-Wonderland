/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MainPage from './components/views/MainPage/MainPage';
import SearchPage from './components/views/SearchPage/search';

import 'bootstrap/dist/css/bootstrap.css';
import ProductList from './components/views/Product/ProductList';
import ProductDetail from './components/views/Product/ProductDetail';
import Intro from './components/views/Intro/Intro';
// 최상위 컴포넌트에 적용해주면 일괄 적용 가능함

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* 인트로 페이지  연결 */}
          <Route exact path="/" component={Intro} />
          {/* 로그인 페이지  연결 */}
          <Route exact path="/login" component={LoginPage} />
          {/* 회원가입 페이지  연결 */}
          <Route exact path="/register" component={RegisterPage} />
          {/* 메인 페이지  연결 */}
          <Route exact path="/main" component={MainPage} />
          {/* 상품 리스트 페이지 연결  */}
          <Route exact path="/productList" component={ProductList} />
          <Route exact path="/productDetail" component={ProductDetail} />
          <Route exact path="/search" component={SearchPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
