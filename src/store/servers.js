/*
 * Author: Eric Sage <eric.david.sage@gmail.com>
 *
 * Represent the NDEx login status of a user.
 *
 */

import { Map, Set } from 'immutable'

const ADD = "ndex/servers/ADD"
const REMOVE = "ndex/servers/REMOVE"

const defaultState = Map({
  'NDEx Public': {
    address: 'http://public.ndexbio.org',
    login: {
      name: "",
      pass: ""
    }
  }
})

export default function serverState(state = defaultState, action) {
    switch(action.type) {
      case ADD:
        return state.set(
          action.serverId,
          {
            address: action.serverAddress,
            login: {
              name: action.name,
              pass: action.pass
            }
          }
        )
      case REMOVE:
        return state.delete(action.serverId)
      default:
        return state
    }
}

/* Add Ndex server */
export function addServer(serverId, address, name, pass) {
  return {
    type: ADD,
    serverId,
    address,
    name,
    pass
  }
}

/* Remove NDEx server */
export function removeServer(serverId) {
  return { type: REMOVE, serverId }
}
