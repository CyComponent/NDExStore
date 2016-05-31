/*
 * Author: Eric Sage <eric.david.sage@gmail.com>
 *
 * Represent the NDEx login status of a user.
 *
 */

import { Map, Set } from 'immutable'

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const defaultState = Map({
  name: "",
  pass: "",
  loggedIn: false
})

export default function credentialsState(state = defaultState, action) {
    switch(action.type) {
      case LOGIN:
        return state.merge({
          name: action.name,
          pass: action.pass,
          loggedIn: true
        })
      case LOGOUT:
        return state.merge({
          name: "",
          pass: "",
          loggedIn: false
        })
      default:
        return state
    }
}

/* Login to Ndex */
export function login(name, pass) {
  return { type: LOGIN, name, pass }
}

/* Login to Ndex */
export function logout() {
  return { type: LOGOUT }
}

