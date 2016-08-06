
import { Map } from 'immutable'
import { ndexSearch } from '../ndex_search'

const ADD = "ndex/networks/ADD"
const REMOVE = "ndex/networks/REMOVE"
const CLEAR = "ndex/networks/CLEAR"

const defaultState = Map({})

export default function update(state = defaultState, action) {
  switch(action.type) {
    case ADD:
      return state.set(action.id, action.summary)
    case REMOVE:
      return state.delete(action.id)
    case CLEAR:
      return MAP({})
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

export function clear() {
  return { type: CLEAR }
}

export function search(query, resultSize=50) {
  ndexSearch('networks', query, resultSize, this)
}
