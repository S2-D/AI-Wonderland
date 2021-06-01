import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddelware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import 'bootstrap/dist/css/bootstrap.css';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddelware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,

  document.getElementById('root')
);

// const port = 5000;
// App.listen(port, () => console.log(`Example app listening on port ${port}!`))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
