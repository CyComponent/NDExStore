/*
 * Author: Eric Sage <eric.david.sage@gmail.com>
 *
 * Represent the NDEx login status of a user.
 *
 */

import { Map, Set } from 'immutable'

const SET_SERVER = "SET_SERVER"
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const defaultState = Map({
  serverName: "Public NDEx",
  serverAddress: "http://public.ndexbio.org",
  userName: "",
  userPass: "",
  loggedIn: false
})

export default function serverState(state = defaultState, action) {
    switch(action.type) {
      case SET_SERVER:
        return state.merge({
          serverName: action.name,
          serverAddress: action.address
        })
      case LOGIN:
        return state.merge({
          userName: action.name,
          userPass: action.pass,
          loggedIn: true
        })
      case LOGOUT:
        return state.merge({
          userName: "",
          userPass: "",
          loggedIn: false
        })
      default:
        return state
    }
}

/* Set Ndex server */
export function setServer(name, address) {
  return { type: SET_SERVER, name, address }
}

/* Login to Ndex */
export function login(name, pass) {
  return { type: LOGIN, name, pass }
}

/* Login to Ndex */
export function logout() {
  return { type: LOGOUT }
}
