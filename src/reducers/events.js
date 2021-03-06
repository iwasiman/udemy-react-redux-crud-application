import {
  CONST_INCREMENT,
  CONST_DECREMENT,
  CONST_READ_EVENTS,
  CONST_DELETE_EVENT,
  CONST_READ_EVENT,
  CONST_UPDATE_EVENT,
  CONST_CREATE_EVENT,
} from '../actions'
import _ from 'lodash' // 配列操作が得意

const initialState = { cntValue: 0};

// Storeに保持されてる値を変えるのがこのReducer。actionの種類で分岐、引数のstateの中を変えて返す
export default (events = initialState, action) => {
  console.log("@@ reducers/events.js in. events=", events, "action.type=", action.type);
  switch (action.type) {
    case CONST_INCREMENT:
      return { cntValue: events.cntValue + 1};
    case CONST_DECREMENT:
      return { cntValue: events.cntValue - 1};

    case CONST_READ_EVENTS:
        // 変数actionはJSオブジェクトで、type:, response:がある。 1件1件がJSオブジェクトの10件並んだ配列。
      console.log("reducers/events in. action:", action);
      const adjustedData = _.mapKeys(action.response.data, "id");
      console.log("lodashでキーがid -> オブジェクト の連想配列に再配置", adjustedData);
      return adjustedData;

    case CONST_DELETE_EVENT:
      //console.log(action.id); //ここで渡ってくる。
      //これをしないと削除後、一覧に戻ると消した行がメモリ上に残っている。
      delete events[action.id];
      // スプレッド演算子で新しいメモリ空間上に変数events内のJSオブジェクトを再配置。
      return { ...events};

    case CONST_READ_EVENT:
    case CONST_UPDATE_EVENT:
    case CONST_CREATE_EVENT:
        console.log("reducers/events in. 1件読み取りか1件更新か1件新規。action.response.data:", action.response.data);
       // この中に id:..., title:..., body:... で入っている
      const data = action.response.data;
      return {...events, [data.id]: data}; //これで指定したIDだけ書き換わるそうな
    default:
      return events;
  }
}