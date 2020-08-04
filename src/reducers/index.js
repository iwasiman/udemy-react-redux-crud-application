import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import events from './events'

// reduxの仕組みで、App側のreducerをひとつにまとめる。
// {}の中はcount, aaa, bbbのようにコンマ区切りで複数書ける
export default combineReducers( { events, form })