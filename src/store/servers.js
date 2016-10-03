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
    version: 'v1',
    login: {
      name: '',
      pass: ''
    }
  }
})

export default function serverState(state = defaultState, action) {
    switch(action.type) {
      case ADD:
        return state.set(
          action.serverId,
          {
            address: action.address,
            version: action.version,
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
export function add_action(serverId, address, version, name, pass) {
  return {
    type: ADD,
    serverId,
    address,
    version,
    name,
    pass
  }
}

/* Remove NDEx server */
export function remove(serverId) {
  return { type: REMOVE, serverId }
}

export function add(serverId, address, name, pass) {
  return (dispatch, getState) => {
    fetch(address + '/rest/admin/status', {
      methind: 'get',
      headers: { 'Content-Type': 'applicaiton/json' }
    }).then(response => {
      return response.json()
    }).then(serverStatus => {
      if (serverStatus.properties.ServerVersion) {
        dispatch(add_action(serverId, address, "v2", name, pass))
      } else {
        dispatch(add_action(serverId, address, "v1", name, pass))
      }
    })
  }
}
