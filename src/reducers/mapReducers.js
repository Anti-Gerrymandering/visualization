import ACTION_EVENTS from '../actions/index'

const { MAP_EVENT } = ACTION_EVENTS

export function mapReducer (state = {}, action) {
  switch (action.type) {
    case MAP_EVENT:
      return Object.assign({}, state, action)
    default:
      return state
  }
}
