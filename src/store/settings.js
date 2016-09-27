/*
 * Author: Eric Sage <eric.david.sage@gmail.com>
 *
 * Represent the NDEx login status of a user.
 *
 */

import { Map } from 'immutable'

const SERVER = "ndex/settings/SERVER"

const defaultState = Map({
  server: 'NDEx Public',
  resultSize: 50
})

export default function serverState(state = defaultState, action) {
    switch(action.type) {
      case SERVER:
        return state.set('server', action.serverId)
      default:
        return state
    }
}

/* Set default  Ndex server */
export function setServer(serverId) {
  return { type: SERVER, serverId }
}
