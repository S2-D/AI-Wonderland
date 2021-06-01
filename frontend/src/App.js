import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// 최상위 컴포넌트에 적용해주면 일괄 적용 가능함

import Intro from './pages/Intro/Intro';
import ProductList from './pages/Product/ProductList';

function App() {
  return (
    <Router>
      <Switch>
        {/* 인트로 페이지  연결 */}
        <Route exact path="/" component={Intro} />
        {/* 상품 리스트 페이지 연결  */}
        <Route exact path="/productList" component={ProductList} />
      </Switch>
    </Router>
  );
}

export default App;
