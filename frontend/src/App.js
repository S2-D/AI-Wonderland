/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MainPage from './components/views/MainPage/MainPage';
import Auth from './hoc/auth';
import FooterPage from './components/views/Footer/Footer';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/main" component={Auth(MainPage, null)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
