/*
 * Author: Eric Sage <eric.david.sage@gmail.com>
 *
 * Load networks into Cytoscape by sending source urls to a rest endpoint.
 */

import { Map, Set } from 'immutable'

const LOAD_BEGIN = "LOAD_BEGIN"
const LOAD_SUCCESS = "LOAD_SUCCESS"
const LOAD_ERROR = "LOAD_ERROR"

const defaultState = Map({
  loading: false,
  response: null,
  error: null
})

export default function cyComponentState(state = defaultState, action) {
    switch(action.type) {
      case LOAD_BEGIN:
        return state.merge({
          loading: true
        })
      case LOAD_SUCCESS:
        return state.merge({
          loading: false,
          response: action.response
        })
      case LOAD_ERROR:
        return state.merge({
          loading: false,
          error: action.error
        })
      default:
        return state
    }
}

/*Toggle to and from a search state so that components can show spinners*/
export function loadBegin() {
  return { type: LOAD_BEGIN }
}

/*Store a list of network summary objects from a successful search*/
export function loadSuccess(response) {
  return { type: LOAD_SUCCESS, response }
}

/*Set an error field if a search did not complete successfully*/
export function loadError(error) {
  return { type: LOAD_ERROR, error }
}

export function load(url) {
  return dispatch =>
    dispatch(loadBegin())
    fetch('http://localhost/v1/networks?source=url&format=cx' {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([url])
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((json) => dispatch(loadSuccess(json)))
      } else {
        const error = new Error(response.statusText)
        error.response = response
        dispatch(loadError(error))
        throw error
      }
    }).catch(error => {
      console.log('Cyrest network load failed', error)
    })
}
