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
// return文を省略するやり方にする。以下がActionな変数
// TOOD: アロー関数だけど => ({ の ( の意味は？
export const incrementAction = () => ({
  type: CONST_INCREMENT, //'CONST_INCREMENT_VAL'
})

export const decrementAction = () => ({
  type: CONST_DECREMENT, //'CONST_DECREMENT_VAL'
})

export const CONST_READ_EVENTS = 'CONST_READ_EVENTS_VAL';
export const CONST_CREATE_EVENT = 'CONST_CREATE_EVENT_VAL';
export const CONST_DELETE_EVENT = 'CONST_DELETE_EVENT_VAL';
export const CONST_READ_EVENT = 'CONST_READ_EVENT_VAL';
export const CONST_UPDATE_EVENT = 'CONST_UPDATE_EVENT_VAL';

const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v1";
const QUERYSTRING = "?token=token123";

// redux-thunkを利用するとActionで関数が返せるようになる。
// Action自体が関数が代入されているので、戻り値として引数dispatchの関数を返す関数。すげえ...
export const readEventsAction = () => async (dispatch) => {
  console.log("** readEventsAction in");
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  console.log("** axiosのget通信終わり", response);
  // dispatchすることで、レスポンスがreducerに渡る。→reducers/events のswitch文に行ける。
   //'CONST_READ_EVENTS_VAL'
  //dispatch({type: CONST_READ_EVENTS, response}); どちらで返してもおなじ
  dispatch({type: CONST_READ_EVENTS, response: response});
}

// 変数valuesには画面で入力したTitle， Bodyの中身が入っている。
export const postEventAction = (values) => async (dispatch) => {
  console.log("** postEventAction in. values=", values);
  // 登録の実処理はここだけ。すごい。
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  console.log("** axiosのpost通信終わり", response);
  dispatch({type: CONST_CREATE_EVENT, response: response});
}

export const deleteEventAction = (id) => async (dispatch) => {
  // 削除の実処理はここだけ。
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispatch({type: CONST_DELETE_EVENT, id});
}

export const getEventAction = (id) => async (dispatch) => {
  console.log("** getEventAction in");
  // 1件取得の実処理はここだけ。
  const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispatch({type: CONST_READ_EVENT, response});
}

export const putEventAction = (values) => async (dispatch) => {
  console.log("** putEventAction in");
  // 1件更新の実処理はここだけ。
  const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values);
  dispatch({type: CONST_UPDATE_EVENT, response});
}
