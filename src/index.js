import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux' // 追加 redux-thunkはミドルウェアなので
import { Provider} from 'react-redux'  // 追加
import thunk from 'redux-thunk' // 追加 ReduxのActionsで非同期処理用
import {BrowserRouter, Route, Switch} from 'react-router-dom' //新規画面への繊維とか
import { composeWithDevTools } from 'redux-devtools-extension' // デバッグツール

import './index.css';

import reducer from './reducers'  // 追加
import EventsIndex from './components/events_index';  // 移動
import EventsNew from './components/events_new';  // routerで使う新規画面
import EventsShow from './components/events_show';  // routerで使う更新画面
import * as serviceWorker from './serviceWorker';

// モードが開発なら、enhancerをデバッグツールの関数でラップして囲む
const enhancer = process.env.NODE_ENV === 'development' ?
composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);
const storeVar = createStore(reducer, enhancer); //ここでRedux側の仕組みでStoreを作って変数に入れる
// セクション5 第2引数で指定することで、redux-thunkを使用

// AppコンポーネントをProviderでラップし、storeを指定。これで画面内どのコンポーネントからも、バケツリレーなしでstoreが直接呼べるようになる。
// react-router-domを入れてると、BrowserRouter, Switch, Routeでルーティング。
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeVar}>
      <BrowserRouter>
        <Switch>
          <Route path="/events/new" component={EventsNew} />
          <Route path="/events/:id" component={EventsShow} />
          <Route exact path="/" component={EventsIndex} />
          <Route exact path="/events" component={EventsIndex} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
