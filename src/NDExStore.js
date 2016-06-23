import { combineReducers } from 'redux'

import lucene, * as luceneActions from './store/lucene'
import server, * as serverActions from './store/server'

const storeName = 'ndex'
const store =  { lucene, server }

export {
  storeName,
  store,
  luceneActions,
  serverActions
}
