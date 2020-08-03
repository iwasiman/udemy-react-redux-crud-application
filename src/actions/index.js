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
// return文を省略するやり方にする。この2つがActionな変数
export const incrementAction = () => ({
  type: CONST_INCREMENT, //'CONST_INCREMENT_VAL'
})

export const decrementAction = () => ({
  type: CONST_DECREMENT, //'CONST_DECREMENT_VAL'
})

