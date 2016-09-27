
import { Map } from 'immutable'
import SearchService from '../service/search_service.js'

const ADD = "ndex/groups/ADD"
const REMOVE = "ndex/groups/REMOVE"
const REPLACE = "ndex/groups/REPLACE"
const CLEAR = "ndex/groups/CLEAR"

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
    summaries: summaries
  }
}

export function clear() {
  return { type: CLEAR }
}

export function search(query) {
  var searchService = new SearchService('group')
  return searchService.search(query)
}

function convertTime(T) {
  var d = new Date(0)
  d.setUTCSeconds(T/1000.0)
  return d.toLocaleDateString()
}
