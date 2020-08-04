import axios from 'axios'


// export const increment = () => {
//   return {
//     type: 'INCREMENT'
//   }  
// }
// export const decrement = () => {
//   return {
//     type: 'DECREMENT'
//   }  
// }

//他の処理でも使うので、グローバルな定数的な値として定義
export const CONST_INCREMENT = 'CONST_INCREMENT_VAL';
export const CONST_DECREMENT = 'CONST_DECREMENT_VAL';
export const CONST_READ_EVENTS = 'CONST_READ_EVENTS_VAL';
// return文を省略するやり方にする。以下がActionな変数
// TOOD: アロー関数だけど => ({ の ( の意味は？
export const incrementAction = () => ({
  type: CONST_INCREMENT, //'CONST_INCREMENT_VAL'
})

export const decrementAction = () => ({
  type: CONST_DECREMENT, //'CONST_DECREMENT_VAL'
})

const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v1";
const QUERYSTRING = "?token=token123";
// redux-thunkを利用するとActionで関数が返せるようになる。
// Action自体が関数が入っているので、戻り値として引数dispatchの関数を返す関数。すげえ...
export const readEventsAction = () => async (dispatch) => {
  console.log("** readEventsAction in");
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  console.log("** axiosの通信終わり", response);
  // dispatchすることで、レスポンスがreducerに渡る。→reducers/events のswitch文に行ける。
   //'CONST_READ_EVENTS_VAL'
  //dispatch({type: CONST_READ_EVENTS, response}); どちらで返してもおなじ
  dispatch({type: CONST_READ_EVENTS, response: response});
}
