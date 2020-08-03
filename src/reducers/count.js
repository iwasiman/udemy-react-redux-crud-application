import { CONST_INCREMENT, CONST_DECREMENT } from '../actions'

const initialState = { cntValue: 0};

// Storeに保持されてる値を変えるのがこのReducer。actionの種類で分岐、引数のstateの中を変えて返す
export default (state = initialState, action) => {
  console.log("@@ reducers/count.js in. state=", state, "action.type=", action.type);
  switch (action.type) {
    case CONST_INCREMENT:
      return { cntValue: state.cntValue + 1};
    case CONST_DECREMENT:
      return { cntValue: state.cntValue - 1};
    default:
      return state;
  }
}