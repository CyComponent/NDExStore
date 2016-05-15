import { combineReducers } from 'redux'

import lucene from './store/network'

import * as networkActions from './store/network'

const storeName = 'cyrest'
const store =  { network }

export {
  storeName,
  store,
  networkActions
}
