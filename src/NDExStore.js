import { combineReducers } from 'redux'

import lucene, * as luceneActions from './store/lucene'
import credentials, * as credActions from './store/credentials'

const storeName = 'ndex'
const store =  { lucene, credentials }

export {
  storeName,
  store,
  luceneActions,
  credActions
}
