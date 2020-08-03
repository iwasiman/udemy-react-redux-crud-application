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

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
// return文を省略するやり方にする
export const increment = () => ({
  type: INCREMENT, //'INCREMENT'
})

export const decrement = () => ({
  type: DECREMENT, //'DECREMENT'
})

