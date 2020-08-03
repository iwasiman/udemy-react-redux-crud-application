import React from 'react';

// propsのテスト
const Cat = (props) => {
  return (<div>やあ、ミーの名前は{props.name}だにゃー。年は{props.age}だよ！</div>);
};
Cat.defaultProps = {
  age: 1
};

function App() {
  const profiles = [
    {name: "シューちゃん", },
    {name: "ジェラトーニ", age: "不明"},
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
