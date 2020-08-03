import React from 'react';
import PropTypes from 'prop-types';

// propsのテスト
const Cat = (props) => {
  return (<div>やあ、ミーの名前は{props.name}だにゃー。年は{props.age}だよ！</div>);
};
Cat.defaultProps = {
  age: 1, 
};
Cat.propTypes = {
  name: PropTypes.string, //小文字開始なのに注意
  age: PropTypes.number.isRequired, //必須になる
}

function App() {
  const profiles = [
    {name: "シューちゃん", },
    {name: "ジェラトーニ", age: 3},
    //{name: 123}, // prop-typesが動くと、DevToolのConsoleに警告が出る
    //{name: "いちにさん", age: "1"}, // これも警告が出る
    {name: "エトワール", age: null}, // isRequiredの警告が出る
    {name: "エトワール2号", age: 2}, // 正常。
  ];
  return (
    <div>
      {
        profiles.map((profile, index) => {
          return <Cat name={profile.name} age={profile.age} key={index} />
        })
      }
    </div>
  );
}
// 上のreturn文、profiles.map... の中も関数なのでさらにreturn と書かないとトランスパイル時にエラーになる。
// Expected an assignment or function call and instead saw an expression...

//       //<Cat name={"シューちゃん"} />
//      //<Cat name={"ジェラトーニ"} age={"不明"} />


export default App;
