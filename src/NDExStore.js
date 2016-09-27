import { combineReducers } from 'redux'

import settings, * as settingActions from './store/settings'
import servers, * as serverActions from './store/servers'
import users, * as userActions from './store/users'
import groups, * as groupActions from './store/groups'
import networks, * as networkActions from './store/networks'

const storeName = 'ndex'
const store =  { settings, servers, users, groups, networks }

export {
  store,
  storeName,
  settingActions,
  serverActions,
  userActions,
  groupActions,
  networkActions
}
