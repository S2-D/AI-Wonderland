/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MainPage from './components/views/MainPage/MainPage';
import Intro from './pages/Intro/Intro';
import ProductList from './pages/Product/ProductList';

import 'bootstrap/dist/css/bootstrap.css';
import ProductDetail from './pages/Product/ProductDetail';
// 최상위 컴포넌트에 적용해주면 일괄 적용 가능함

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* 로그인 페이지  연결 */}
          <Route exact path="/login" component={LoginPage} />
          {/* 회원가입 페이지  연결 */}
          <Route exact path="/register" component={RegisterPage} />
          {/* 메인 페이지  연결 */}
          <Route exact path="/main" component={MainPage} />
          {/* 인트로 페이지  연결 */}
          <Route exact path="/" component={Intro} />
          {/* 상품 리스트 페이지 연결  */}
          <Route exact path="/productList" component={ProductList} />
          <Route exact path="/productDetail" component={ProductDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
