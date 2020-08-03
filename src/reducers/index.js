import { combineReducers } from 'redux'
import count from './count'

// reduxの仕組みで、App側のreducerをひとつにまとめる。
// {}の中はcount, aaa, bbbのようにコンマ区切りで複数書ける
export default combineReducers( { count })