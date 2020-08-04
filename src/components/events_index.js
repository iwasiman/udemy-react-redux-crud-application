import React, {Component} from 'react';
import { connect } from 'react-redux' //追加

import { readEventsAction} from '../actions' // 追加したやつ
import _ from 'lodash' // 配列操作用
import { Link } from 'react-router-dom' //新規画面用



class EventsIndex extends Component {
  componentDidMount() {
    console.log("** LifeCycle componentDidMount() コールされたよ");
    // この時点でpropsの中に関数が入った変数readEventsActionが入っているので呼べる。
    // propsに渡されるのは外部からの静的な文字列などのイメージなので、このへん不思議な感じがする。
    this.props.readEventsAction();
  }

  renderEvents() {
    // this.props.eventsに、reducerの戻り値で返された10件が入っている。これも不思議な動き。
    // TODO: keyが効かない。なぜ？
    // Link to のあとはシングルクオートでなく`に注意。
    return _.map(this.props.events, event => (
      <tr key={event.id} >
        <td>{event.id}</td>
        <td>
          <Link to={`/events/${event.id}`} >
            {event.title}
          </Link>
        </td>
        <td>{event.body}</td>
      </tr>

    ));
  }

  render() {
    // render()内に来る時点で、propsの中にcntValue, 関数が入ったincrementSction, decrementActionが入っている。これがクリックで呼ばれる。
    console.log("@@ EventsIndex#render() in. this.props", this.props);

    return (
      <React.Fragment>
        <h1>EventsIndex React * Reduxを連携させたデータ取得アプリケーションだよ</h1>
        <table border="1">
          <thead>
            <tr>
              <td>IDだよ</td>
              <td>たいとる</td>
              <td>ボディ</td>
            </tr>
          </thead>
          <tbody>
            {this.renderEvents()}
          </tbody>
        </table>

        <Link to="/events/new">新しいイベント！</Link>
      </React.Fragment>
    
    )
  }
}

// react-reduxで必要な変数。stateを引数に取る関数で、実処理としてstate内のプロパティを再定義。
//const mapStateToProps = (state) => ({ cntValue: state.count.cntValue});
//const mapStateToProps = (state) => ({}); // この時点ではstateは空
const mapStateToProps = (state) => ({events: state.events}); // この時点ではstateは空

// react-reduxで必要な変数。定義済みのActionをJSオブジェクト？として渡す。キーが無いのは？
// これだとdispatchがundefinedとか出た
// const mapDispatchToProps = disaptch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// })

//react-reduxのマニュアルにも書いてある省略記法パターン
//const mapDispatchToProps = ({ incrementAction, decrementAction});
const mapDispatchToProps = ({ readEventsAction });

// react-reduxで必要なし処理。connect関数を使って紐付ける。
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)

