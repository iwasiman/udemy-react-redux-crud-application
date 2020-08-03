import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux' // 追加
import { Provider} from 'react-redux'  // 追加

import './index.css';

import reducer from './reducers'  // 追加
import App from './components/App';  // 移動
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer)

// AppコンポーネントをProviderでラップし、storeを指定。これでどのコンポーネントからもstoreが呼べるようになる。
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
