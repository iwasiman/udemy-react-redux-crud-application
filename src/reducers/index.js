import { combineReducers } from 'redux'
import events from './events'

// reduxの仕組みで、App側のreducerをひとつにまとめる。
// {}の中はcount, aaa, bbbのようにコンマ区切りで複数書ける
export default combineReducers( { events })