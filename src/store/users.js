
import { Map } from 'immutable'
import SearchService from '../service/search_service.js'

const ADD = "ndex/users/ADD"
const REMOVE = "ndex/users/REMOVE"
const REPLACE = "ndex/users/REPLACE"
const CLEAR = "ndex/users/CLEAR"

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

export function search(query) {
  var searchService = new SearchService('user')
  return searchService.search(query)
}

function convertTime(T) {
  var d = new Date(0)
  d.setUTCSeconds(T/1000.0)
  return d.toLocaleDateString()
}
