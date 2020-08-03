import React, {Component} from 'react';
import { connect } from 'react-redux' //追加

import { incrementAction, decrementAction} from '../actions' // 追加したやつ



class App extends Component {
  render() {
    // render()内に来る時点で、propsの中にcntValue, 関数が入ったincrementSction, decrementActionが入っている。これがクリックで呼ばれる。
    console.log("@@ App#render() in. this.props", this.props);
    const props = this.props;

    return (
      <React.Fragment>
        <h1>React * Reduxを連携させたカウンタアプリケーションだよ</h1>
        <div>value::: {props.cntValue}</div>
        <button onClick={props.incrementAction}>プラスしよう</button>
        <button onClick={props.decrementAction}>マイナスしよう</button>
      </React.Fragment>
    
    )
  }
}

// react-reduxで必要な変数。stateを引数に取る関数で、実処理としてstate内のプロパティを再定義。
const mapStateToProps = (state) => ({ cntValue: state.count.cntValue});

// react-reduxで必要な変数。定義済みのActionをJSオブジェクト？として渡す。キーが無いのは？
// これだとdispatchがundefinedとか出た
// const mapDispatchToProps = disaptch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// })

//react-reduxのマニュアルにも書いてある省略記法パターン
const mapDispatchToProps = ({ incrementAction, decrementAction});

// react-reduxで必要なし処理。connect関数を使って紐付ける。
export default connect(mapStateToProps, mapDispatchToProps)(App)

