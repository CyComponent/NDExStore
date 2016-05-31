/*
 * Author: Eric Sage <eric.david.sage@gmail.com>
 *
 * Search for network summary objects using the NDEx Lucene search mechanism. Stores a list of
 * network summary objects for each search, overwriting the summary objects from the last search.
 * Keeps track of search errors and searching state.
 */

import { Map, Set } from 'immutable'

const SEARCH_BEGIN = "SEARCH_BEGIN"
const SEARCH_SUCCESS = "SEARCH_SUCCESS"
const SEARCH_ERROR = "SEARCH_ERROR"

const defaultState = Map({
  searching: false,
  networkSummaries: Set(),
  error: null
})

export default function cyComponentState(state = defaultState, action) {
    switch(action.type) {
      case SEARCH_BEGIN:
        return state.merge({
          searching: true
        })
      case SEARCH_SUCCESS:
        return state.merge({
          searching: false,
          networkSummaries: action.networkSummaries
        })
      case SEARCH_ERROR:
        return state.merge({
          searching: false,
          error: action.error
        })
      default:
        return state
    }
}

/*Toggle to and from a search state so that components can show spinners*/
export function searchBegin() {
  return { type: SEARCH_BEGIN }
}

/*Store a list of network summary objects from a successful search*/
export function searchSuccess(networkSummaries) {
  return { type: SEARCH_SUCCESS, networkSummaries }
}

/*Set an error field if a search did not complete successfully*/
export function searchError(error) {
  return { type: SEARCH_ERROR, error }
}

export function searchFor(query, resultSize = 50) {
  return dispatch =>
    fetch('http://dev2.ndexbio.org/rest/network/search/0/' + resultSize, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchString: query})
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((networkSummaries) => dispatch(searchSuccess(networkSummaries)))
      } else {
        const error = new Error(response.statusText)
        error.response = response
        dispatch(searchError(error))
        throw error
      }
    }).catch(error => {
      console.log('NDEx lucene Search failed', error)
    })
}
