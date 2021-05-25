import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Intro from './pages/Intro/Intro';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 인트로 페이지  연결 */}
        <Route path="/" component={Intro} />
      </div>
    </Router>
  );
}

export default App;
