import { CONST_INCREMENT, CONST_DECREMENT, CONST_READ_EVENTS} from '../actions'
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
    default:
      return events;
  }
}