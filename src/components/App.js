import React, {Component} from 'react';


function App() {
  return (
    <Counter></Counter>
  );
}

class Counter extends Component {
  constructor(props) {
    super(props);
    console.log("constructor", this.state);
    this.state = {count: 0}; // stateはクラス全体でひとつのJSオブジェクト
  }

  handlePlusButton = () => {
    console.log("プラスだよ");
    //this.state = {count: 0};
    // 上のようにstateを直接変更しようとするとだめ。警告を出してくれる。
    // Line 19:5:  Do not mutate state directly. Use setState()  react/no-direct-mutation-state
    this.setState({count: this.state.count + 1});
  }

  // 従来の関数を変数に代入する形だと実行時にエラー。アロー関数でないとthisの指す先が変わってるから？
  //handleMinusButton = function() {
  handleMinusButton = () => {
    console.log("マイナスだよ");
    this.setState({count: this.state.count - 1});
  }

  // this.setStateを呼ぶと、コールバックで指定されているrender()がその都度自動で呼ばれて再描画してくれる。
  // Vue.jsの算出プロパティ周りと対応か。
  //this.[data:やcomputed:のプロパティ名] でなく this.sate.[stateの中のプロパティ名] と一段深いのがめんどいかも。
  render() {
    console.log("@@render() 実行されたよ");
    return (
      <React.Fragment>
        <div>count::: {this.state.count}</div>
        <button onClick={this.handlePlusButton}>プラスしよう</button>
        <button onClick={this.handleMinusButton}>マイナスしよう</button>
      </React.Fragment>
    
    )
  }
}


export default App;
