import ACTION_EVENTS from '../actions/index'

const { GEO_DATA_LOADED } = ACTION_EVENTS

export function mapReducer (state = {}, action) {
  switch (action.type) {
    case GEO_DATA_LOADED:
      return Object.assign({}, state, action)
    default:
      return state
  }
}
