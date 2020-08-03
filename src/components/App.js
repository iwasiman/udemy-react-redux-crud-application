import React, {Component} from 'react';
import { connect } from 'react-redux' //追加

import { increment, decrement} from '../actions' // 追加したやつ



class App extends Component {
  render() {
    const props = this.props;

    return (
      <React.Fragment>
        <div>value::: {props.value}</div>
        <button onClick={props.increment}>プラスしよう</button>
        <button onClick={props.decrement}>マイナスしよう</button>
      </React.Fragment>
    
    )
  }
}

const mapStateToProps = state => ({ value: state.count.value});
// これだとdispatchがundefinedとか出た
// const mapDispatchToProps = disaptch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// })

//react-reduxのマニュアルにも書いてある省略記法パターン
const mapDispatchToProps = ({ increment, decrement});

export default connect(mapStateToProps, mapDispatchToProps)(App)

