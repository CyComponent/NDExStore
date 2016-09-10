
import { Map } from 'immutable'

const ADD = "ndex/networks/ADD"
const REMOVE = "ndex/networks/REMOVE"
const REPLACE = "ndex/networks/REPLACE"
const CLEAR = "ndex/networks/CLEAR"

const defaultState = Map({})

export default function update(state = defaultState, action) {
  switch(action.type) {
    case ADD:
      return state.set(action.id, action.summary)
    case REMOVE:
      return state.delete(action.id)
    case REPLACE:
      return Map(action.summaries)
    case CLEAR:
      return Map({})
    default:
      return state
  }
}

export function add(id, summary) {
  return { type: ADD, id, summary }
}

export function remove(id) {
  return { type: REMOVE, id }
}

export function replace(summaries) {
  return {
    type: REPLACE,
    summaries: summaries.reduce(function(Sums, S) {
      S.modificationTime = convertTime(S.modificationTime)
      S.creationTime = convertTime(S.creationTime)
      Sums[S.externalId] = S
      return Sums
    }, {})
  }
}

export function clear() {
  return { type: CLEAR }
}

export function search(query, resultSize=50) {
  return ndexSearch('network', query, resultSize)
}

function ndexSearch(type, query, resultSize) {
  return (dispatch, getState) => {
    var postHeaders = {}
    postHeaders['Accept'] = 'application/json'
    postHeaders['Content-Type'] = 'application/json'
    const server = getState().ndex.server.toJS()
    if (server.loggedIn) {
      postHeaders['Authorization'] = 'Basic ' + btoa(server.userName + ':' + server.userPass)
    }
    fetch(server.serverAddress + '/rest/' + type + '/search/0/' + resultSize, {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({searchString: query})
    }).then(response => {
      return response.json()
    }).then(summaries => {
      dispatch(clear())
      dispatch(replace(summaries))
    }).catch(e => console.log(e))
  }
}

function convertTime(T) {
  var d = new Date(0)
  d.setUTCSeconds(T/1000.0)
  return d.toLocaleDateString()
}
