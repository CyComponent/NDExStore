import { combineReducers } from 'redux'

import server, * as serverActions from './store/server'
import users, * as userActions from './store/users'
import groups, * as groupActions from './store/groups'
import networks, * as networkActions from './store/networks'

const storeName = 'ndex'
const store =  { server, users, groups, networks }

export {
  store,
  storeName,
  serverActions,
  userActions,
  groupActions,
  networkActions
}
