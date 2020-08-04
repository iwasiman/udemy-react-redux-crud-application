import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux' // 追加 redux-thunkはミドルウェアなので
import { Provider} from 'react-redux'  // 追加
import thunk from 'redux-thunk' // 追加 ReduxのActionsで非同期処理用

import './index.css';

import reducer from './reducers'  // 追加
import EventsIndex from './components/events_index';  // 移動
import * as serviceWorker from './serviceWorker';

const storeVar = createStore(reducer, applyMiddleware(thunk)); //ここでRedux側の仕組みでStoreを作って変数に入れる
// セクション5 第2引数で指定することで、redux-thunkを使用

// AppコンポーネントをProviderでラップし、storeを指定。これで画面内どのコンポーネントからも、バケツリレーなしでstoreが直接呼べるようになる。
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeVar}>
      <EventsIndex />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
